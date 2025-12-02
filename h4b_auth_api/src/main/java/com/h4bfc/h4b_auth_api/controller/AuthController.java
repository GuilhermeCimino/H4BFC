package com.h4bfc.h4b_auth_api.controller;

import com.h4bfc.h4b_auth_api.model.User;
import com.h4bfc.h4b_auth_api.repository.UserRepository;
import io.javalin.Javalin;

import java.util.Map;
import java.util.UUID;

public class AuthController {
     private static final UserRepository repo = new UserRepository();

    public static void registerRoutes(Javalin app) {

        // Rota de login
        app.post("/login", ctx -> {
            Map<String, String> json = ctx.bodyAsClass(Map.class);
            String username = json.get("username");
            String password = json.get("password");

            User user = repo.find(username, password);

            if (user == null) {
                ctx.status(401).json("Usuário ou senha incorretos");
                return;
            }

            String token = UUID.randomUUID().toString();

            // Coloque try/catch aqui
            try {
                repo.updateToken(user.getId(), token);
            } catch (Exception e) {
                System.err.println("Erro ao atualizar token no banco: " + e.getMessage());
                e.printStackTrace();
                // Mas mesmo assim vamos continuar e enviar o token
            }

            System.out.println("Token gerado: " + token);
            ctx.json(Map.of("token", token));
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



        // Middleware proteção
        app.before("/api/*", ctx -> {
            String token = ctx.header("Authorization");

            if (token == null || repo.findByToken(token) == null) {
                ctx.status(401).result("Token inválido ou ausente");
                return; // substitui ctx.abort()
            }
        });

        // Rota protegida
        app.get("/api/segredo", ctx -> {
            ctx.result("Acesso autorizado! Token válido.");
        });
    }
}