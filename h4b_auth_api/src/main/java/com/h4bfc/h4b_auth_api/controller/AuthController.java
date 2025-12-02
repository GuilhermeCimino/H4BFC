package com.h4bfc.h4b_auth_api.controller;

import com.h4bfc.h4b_auth_api.model.User;
import com.h4bfc.h4b_auth_api.repository.UserRepository;
import io.javalin.Javalin;

import java.util.Map;
import java.util.UUID;
import java.util.Date; 

public class AuthController {
    private static final UserRepository repo = new UserRepository();

    public static void registerRoutes(Javalin app) {
        // Rota de login
       // Rota de login
app.post("/login", ctx -> {
    Map<String, String> json = ctx.bodyAsClass(Map.class);
    String username = json.get("username");
    String password = json.get("password");

    User user = repo.find(username, password);

    if (user == null) {
        // Se for HTML, redireciona de volta pro login com erro
        if (ctx.header("Accept") != null && ctx.header("Accept").contains("text/html")) {
            ctx.redirect("/login.html?erro=1");
        } else {
            ctx.status(401).json("Usuário ou senha incorretos");
        }
        return;
    }

    String token = UUID.randomUUID().toString();
    repo.updateToken(user.getId(), token);
    

    // Se for requisição do navegador (HTML), redireciona
    if (ctx.header("Accept") != null && ctx.header("Accept").contains("text/html")) {
        // Salva o token em cookie ou sessão
        ctx.cookie("auth_token", token);
        ctx.redirect("/cadastro.html"); // ← PRA ONDE QUER IR DEPOIS DO LOGIN
    } else {
        // Se for API (mobile, etc), retorna JSON
        ctx.json(Map.of("token", token));
    }
});

        // validar o token e retornar dados do usuário
        app.get("/perfil", ctx -> {
            String token = ctx.header("Authorization");

            if (token == null || repo.findByToken(token) == null) {
                ctx.status(401).result("Token inválido ou ausente");
                return;
            }

            User user = repo.findByToken(token);

            ctx.json(Map.of(
                "id", user.getId(),
                "username", user.getUsername()
            ));
        });

        
        
// ROTA DE CADASTRO (COM VERIFICAÇÃO DE TOKEN)
app.post("/api/cadastro", ctx -> {
    try {
        // VERIFICA TOKEN 
        String token = ctx.header("Authorization");
        System.out.println("DEBUG: Token recebido: " + (token != null ? token.substring(0, Math.min(20, token.length())) + "..." : "NULL"));
        
        if (token == null) {
            ctx.status(401).json("Token não enviado");
            return;
        }
        
        User user = repo.findByToken(token);
        if (user == null) {
            ctx.status(401).json("Token inválido ou expirado");
            return;
        }
        
        System.out.println("DEBUG: Usuário autenticado: " + user.getUsername());
        
        // Processa os dados
        Map<String, String> dados = ctx.bodyAsClass(Map.class);
        
        String nome = dados.get("nome");
        String email = dados.get("email");
        
        if (nome == null || nome.trim().isEmpty()) {
            ctx.status(400).json("Nome é obrigatório");
            return;
        }
        
        if (email == null || email.trim().isEmpty()) {
            ctx.status(400).json("E-mail é obrigatório");
            return;
        }
        
        String idSimulado = "FUNC-" + System.currentTimeMillis();
        
        // Retorna resposta
        ctx.json(Map.of(
            "status", "success",
            "message", "Funcionário cadastrado com sucesso!",
            "usuario_logado", user.getUsername(),
            "data", Map.of(
                "id", idSimulado,
                "nome", nome,
                "email", email,
                "data_cadastro", new Date().toString(),
                "criado_por", user.getUsername()  // Agora mostra quem cadastrou
            )
        ));
        
    } catch (Exception e) {
        System.err.println("Erro no cadastro: " + e.getMessage());
        e.printStackTrace();
        ctx.status(500).json("Erro interno no servidor");
    }
});
}
}