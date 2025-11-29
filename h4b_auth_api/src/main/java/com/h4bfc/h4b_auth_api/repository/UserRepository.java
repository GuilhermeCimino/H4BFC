package com.h4bfc.h4b_auth_api.repository;

import com.h4bfc.h4b_auth_api.database.SQLiteConnection;
import com.h4bfc.h4b_auth_api.model.User;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class UserRepository {
     public User find(String username, String password) throws Exception {
        String sql = "SELECT * FROM users WHERE username = ? AND password = ?";
        try (Connection conn = SQLiteConnection.connect();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, username);
            stmt.setString(2, password);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                return new User(
                        rs.getInt("id"),
                        rs.getString("username"),
                        rs.getString("password"),
                        rs.getString("token")
                );
            }
        }
        return null;
    }

    public void updateToken(int id, String token) throws Exception {
        String sql = "UPDATE users SET token = ? WHERE id = ?";
        try (Connection conn = SQLiteConnection.connect();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, token);
            stmt.setInt(2, id);
            stmt.executeUpdate();
        }
    }

    public User findByToken(String token) throws Exception {
        String sql = "SELECT * FROM users WHERE token = ?";
        try (Connection conn = SQLiteConnection.connect();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, token);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                return new User(
                        rs.getInt("id"),
                        rs.getString("username"),
                        rs.getString("password"),
                        rs.getString("token")
                );
            }
        }
        return null;
    }

    public void create(String username, String password) throws Exception {
        String sql = "INSERT INTO users (username, password) VALUES (?, ?)";
        try (Connection conn = SQLiteConnection.connect();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, username);
            stmt.setString(2, password);
            stmt.executeUpdate();
        }
    }
}
