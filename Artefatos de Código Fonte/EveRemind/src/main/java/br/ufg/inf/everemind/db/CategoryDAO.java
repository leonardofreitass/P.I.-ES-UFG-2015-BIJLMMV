/*
 * The MIT License
 *
 * Copyright 2015 Igor.
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

import br.ufg.inf.everemind.entity.Category;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import java.util.ArrayList;
import org.bson.Document;

/**
 *
 * @author Igor
 */
public class CategoryDAO {

    private static CategoryDAO instance = null;
    private final MongoDatabase mongoDatabase;
    private final MongoCollection<Document> collection;

    private CategoryDAO() {
        this.mongoDatabase = DatabaseConnection.create();
        this.collection = this.mongoDatabase.getCollection("categories");
    }

    public static synchronized CategoryDAO getInstance() {
        if (instance == null) {
            instance = new CategoryDAO();
        }
        return instance;
    }

    public void save(Category category) {
        if (!this.categoryNameAlreadyRegistered(category)) {
            Document categoryDB = new Document("name", category.getName())
                    .append("color", category.getColor())
                    .append("_idUser", category.getIdUser());
            this.collection.insertOne(categoryDB);
        }
    }

    public Category getOne(String _idUser, String name) {
        Document query = new Document("_idUser", _idUser).append("name", name);
        Document search = collection.find(query).first();
        if (search == null) {
            return null;
        }

        Category category = new Category(search.getString("name"),
                search.getString("color"),
                search.getString("_idUser"));
        category.setId(search.getObjectId("_id").toString());
                
        return category;
    }

    public ArrayList<Category> getAll(String _idUser) {
        ArrayList<Category> categoryList = new ArrayList<>();
        Document query = new Document("_idUser", _idUser);
        FindIterable<Document> search = collection.find(query);
        if (search == null) {
            return null;
        }
        for (Document current : search) {
            Category category = new Category(current.getString("name"),
                    current.getString("color"),
                    current.getString("_idUser"));
            category.setId(current.getObjectId("_id").toString());
            categoryList.add(category);
        }
        return categoryList;
    }

    public void delete(String name, String _idUser) {
        Document query = new Document("name", name).append("_idUser", _idUser);
        collection.deleteOne(query);
    }

    public void updateInfo(String name, Category category) {
        Document query = new Document("name", name).append("_idUser", category.getIdUser());
        Document categoryDB = new Document("name", category.getName())
                .append("color", category.getColor());
        collection.updateOne(query, new Document("$set", categoryDB));
    }

    public boolean categoryNameAlreadyRegistered(Category category) {
        Document query = new Document("name", category.getName())
                .append("_idUser", category.getIdUser());
        Document search = collection.find(query).first();
        return search != null;
    }

}
