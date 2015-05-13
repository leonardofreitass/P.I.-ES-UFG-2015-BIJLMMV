/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.ufg.inf.everemind.db;

import br.ufg.inf.everemind.entity.User;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import java.net.UnknownHostException;
import org.bson.Document;

/**
 *
 * @author Leonardo
 */
public class UserDAO {

    private static UserDAO instance = null;
    private final MongoDatabase mongoDatabase;
    private final MongoCollection<Document> collection;

    private UserDAO() throws UnknownHostException {
        this.mongoDatabase = DatabaseConnection.create();
        this.collection = this.mongoDatabase.getCollection("users");
    }

    public static synchronized UserDAO getInstance() throws UnknownHostException {
        if (instance == null) {
            instance = new UserDAO();
        }
        return instance;
    }

    public void save(User user) {
        Document userDB = new Document("fullName", user.getFullName())
                .append("email", user.getEmail())
                .append("secondaryEmail", user.getSecondaryEmail())
                .append("hash", user.getHash());
        this.collection.insertOne(userDB);
    }

    public boolean authenticate(String email, String hash) {
        Document query = new Document("email", email)
                .append("hash", hash);
        Document auth = collection.find(query).first();
        return auth != null;
    }

    public User getByEmail(String email) {
        Document query = new Document("email", email);
        Document search = collection.find(query).first();
        if (search == null) {
            return null;
        }

        return new User(search.getString("fullName"), search.getString("email"), search.getString("secondaryEmail"));
    }

    public User getBySecondaryEmail(String secondaryEmail) {
        Document query = new Document("secondaryEmail", secondaryEmail);
        Document search = collection.find(query).first();
        if (search == null) {
            return null;
        }

        return new User(search.getString("fullName"), search.getString("email"), search.getString("secondaryEmail"));
    }

    public User getByFullName(String fullName) {
        Document query = new Document("fullName", fullName);
        Document search = collection.find(query).first();
        if (search == null) {
            return null;
        }

        return new User(search.getString("fullName"), search.getString("email"), search.getString("secondaryEmail"));
    }

    public void delete(String email) {
        Document query = new Document("email", email);
        collection.deleteOne(query);
    }

    public void updateInfo(String email, User user) {
        Document query = new Document("email", email);
        Document userDB = new Document("fullName", user.getFullName())
                .append("email", user.getEmail())
                .append("secondaryEmail", user.getSecondaryEmail());
        collection.updateOne(query, new Document("$set", userDB));
    }

    public void updateHash(String email, String hash) {
        Document query = new Document("email", email);
        Document hashDB = new Document("hash", hash);
        collection.updateOne(query, new Document("$set", hashDB));
    }
}
