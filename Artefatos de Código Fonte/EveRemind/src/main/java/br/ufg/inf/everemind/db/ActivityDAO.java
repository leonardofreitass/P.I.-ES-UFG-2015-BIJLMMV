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

import br.ufg.inf.everemind.entity.Activity;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import java.util.ArrayList;
import org.bson.Document;
import org.bson.types.ObjectId;

/**
 *
 * @author Igor
 */
public class ActivityDAO {

    private static ActivityDAO instance = null;
    private final MongoDatabase mongoDatabase;
    private final MongoCollection<Document> collection;

    private ActivityDAO() {
        this.mongoDatabase = DatabaseConnection.create();
        this.collection = this.mongoDatabase.getCollection("activities");
    }

    public static synchronized ActivityDAO getInstance() {
        if (instance == null) {
            instance = new ActivityDAO();
        }
        return instance;
    }

    public void save(Activity activity) {
        Document activityDB = new Document("_idCategory", activity.getIdCategory())
                .append("name", activity.getName())
                .append("priority", activity.getPriority())
                .append("date", activity.getDate())
                .append("hour", activity.getHour())
                .append("notes", activity.getNotes())
                .append("notificationBehaviour", activity.getNotificationBehaviour())
                .append("lastNotificationTime", activity.getLastNotificationTime())
                .append("nextNotificationTime", activity.getNextNotificationTime())
                .append("done", false);
        this.collection.insertOne(activityDB);
    }

    public Activity getOne(String _id) {
        Document query = new Document("_id",  new ObjectId(_id));
        Document search = collection.find(query).first();
        if (search == null) {
            return null;
        }

        Activity activity = new Activity(search.getString("_idCategory"),
                search.getString("name"),
                search.getInteger("priority", -1),
                search.getString("date"),
                search.getString("hour"),
                search.getString("notes"),
                search.getBoolean("notificationBehaviour", false),
                search.getString("lastNotificationTime"),
                search.getString("nextNotificationTime"));
        activity.setId(search.getObjectId("_id").toString());
        activity.setDone(search.getBoolean("done", false));

        return activity;
    }

    public ArrayList<Activity> getAllFromCategory(String _idCategory, boolean onlyUndone) {
        ArrayList<Activity> activityList = new ArrayList<>();
        Document query = new Document("_idCategory", _idCategory);
        if (onlyUndone)
            query.append("done", false);
        FindIterable<Document> search = collection.find(query);
        if (search == null) {
            return null;
        }
        for (Document current : search) {
            Activity activity = new Activity(current.getString("_idCategory"),
                    current.getString("name"),
                    current.getInteger("priority", -1),
                    current.getString("date"),
                    current.getString("hour"),
                    current.getString("notes"),
                    current.getBoolean("notificationBehaviour", false),
                    current.getString("lastNotificationTime"),
                    current.getString("nextNotificationTime"));
            activity.setId(current.getObjectId("_id").toString());
            activity.setDone(current.getBoolean("done", false));
            activityList.add(activity);
        }
        return activityList;
    }
    
    public void deleteAllFromCategory(String _idCategory) {
        Document query = new Document("_idCategory", _idCategory);
        collection.deleteMany(query);
    }

    public void delete(String _id) {
        Document query = new Document("_id",  new ObjectId(_id));
        collection.deleteOne(query);
    }

    public void updateInfo(String _id, Activity activity) {
        Document query = new Document("_id", new ObjectId(_id));
        Document activityDB = new Document("_idCategory", activity.getIdCategory())
                .append("name", activity.getName())
                .append("priority", activity.getPriority())
                .append("date", activity.getDate())
                .append("hour", activity.getHour())
                .append("notes", activity.getNotes())
                .append("notificationBehaviour", activity.getNotificationBehaviour())
                .append("lastNotificationTime", activity.getLastNotificationTime())
                .append("nextNotificationTime", activity.getNextNotificationTime());
        collection.updateOne(query, new Document("$set", activityDB));
    }
    
    public void setDone(String _id){
        Document query = new Document("_id", new ObjectId(_id));
        Document activityDB = new Document("done", true);
        collection.updateOne(query, new Document("$set", activityDB));
    }
}
