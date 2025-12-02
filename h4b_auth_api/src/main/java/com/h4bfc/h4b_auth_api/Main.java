package com.h4bfc.h4b_auth_api;

import io.javalin.Javalin;                               // Para criar o servidor
import com.h4bfc.h4b_auth_api.database.SQLiteConnection;  // Para criar/verificar tabela
import com.h4bfc.h4b_auth_api.repository.UserRepository;
import com.h4bfc.h4b_auth_api.controller.AuthController;
import com.h4bfc.h4b_auth_api.model.User;

//ver funcionando   http://localhost:7070/login.html


public class Main {

    public static void main(String[] args) {
        // Cria/verifica tabela do banco
        SQLiteConnection.createTable();

        // ===== CRIA O USUÁRIO AUTOMATICAMENTE =====
        UserRepository repo = new UserRepository();
        try {
            User existing = repo.find("admin1@gmail.com", "1234"); // tenta encontrar usuário com email correto
            if (existing == null) {
                repo.create("admin1@gmail.com", "1234");
                System.out.println("Usuário admin1@gmail.com criado com sucesso!");
            } else {
                repo.updatePassword(existing.getId(), "1234");
                System.out.println("Usuário já existe, senha atualizada.");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        // ===========================================

        // Inicializa servidor Javalin
       Javalin app = Javalin.create(config -> {
        config.http.defaultContentType = "application/json";

        // Serve arquivos estáticos da pasta resources/public
        config.staticFiles.add("public");

        config.plugins.enableCors(cors -> {
            cors.add(it -> it.anyHost());
            });
        }).start(7070);

        System.out.println("Servidor iniciado em http://localhost:7070");

        // Rota raiz só para teste
        app.get("/", ctx -> ctx.result("Servidor rodando!"));

        // Registra rotas do AuthController
        AuthController.registerRoutes(app);
    }
}
