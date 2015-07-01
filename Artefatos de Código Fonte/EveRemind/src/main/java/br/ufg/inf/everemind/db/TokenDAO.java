/*
 * The MIT License
 *
 * Copyright 2015 Leonardo.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
package br.ufg.inf.everemind.db;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

/**
 *
 * @author Leonardo
 */
public class TokenDAO {
    private static TokenDAO instance = null;
    private final MongoDatabase mongoDatabase;
    private final MongoCollection<Document> collection;

    private TokenDAO() {
        this.mongoDatabase = DatabaseConnection.create();
        this.collection = this.mongoDatabase.getCollection("tokens");
    }

    public static synchronized TokenDAO getInstance() {
        if (instance == null) {
            instance = new TokenDAO();
        }
        return instance;
    }
    
    public void bindVerifyToken(String email, String token){
        Document tokenDB = new Document("email", email)
                .append("token", token)
                .append("type", "Verify");
        this.collection.insertOne(tokenDB);
    }
    
    public void bindRecoverToken(String email, String token){
        Document tokenDB = new Document("email", email)
                .append("token", token)
                .append("type", "Recover");
        this.collection.insertOne(tokenDB);
    }
    
    public String getEmailVerificationBind(String email){
        Document query = new Document("email", email)
                .append("type", "Verify");
        Document search = collection.find(query).first();
        
        if (search == null)
            return null;
        
        return search.getString("token");
    }
    
    public boolean hasEmailVerificationBind(String email, String token){
        Document query = new Document("email", email)
                .append("token", token)
                .append("type", "Verify");
        Document search = collection.find(query).first();
        return search != null;
    }
    
    public boolean hasPasswordRecoveryBind(String email, String token){
        Document query = new Document("email", email)
                .append("token", token)
                .append("type", "Recover");
        Document search = collection.find(query).first();
        return search != null;
    }
    
    public void removeVerifyBind(String email){
        Document query = new Document("email", email).append("type", "Verify");
        collection.deleteOne(query);
    }
    
    public void removeRecoveryBind(String email){
        Document query = new Document("email", email).append("type", "Recover");
        collection.deleteOne(query);
    }
}
