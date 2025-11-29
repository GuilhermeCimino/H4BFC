package com.h4bfc.h4b_auth_api.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class SQLiteConnection {
   
   private static final String URL = "jdbc:sqlite:users.db";

    public static Connection connect() throws Exception {
        return DriverManager.getConnection(URL);
    }

    public static void createTable() {

        String sqlCreate =
                "CREATE TABLE IF NOT EXISTS users (" +
                        "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                        "username TEXT UNIQUE NOT NULL, " +
                        "password TEXT NOT NULL" +
                        ")";

        String sqlAlter = "ALTER TABLE users ADD COLUMN token TEXT";

        try (Connection conn = connect();
             Statement stmt = conn.createStatement()) {

            stmt.execute(sqlCreate);
            System.out.println("Tabela 'users' criada/verificada.");

            try {
                stmt.execute(sqlAlter);
                System.out.println("Coluna 'token' adicionada.");
            } catch (Exception e) {
                System.out.println("Aviso: coluna token já existe.");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
