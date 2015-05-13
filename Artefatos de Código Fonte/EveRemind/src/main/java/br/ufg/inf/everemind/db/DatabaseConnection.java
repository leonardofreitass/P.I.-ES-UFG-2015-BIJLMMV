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

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoDatabase;
import java.net.UnknownHostException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Leonardo
 */

public class DatabaseConnection {
    
    /**
     * Define com qual banco de dados o programa vai fazer conexão,
     * ela pode ser 'local' par aum banco de dados na própria maquina 'localhost',
     * ou 'heroku' para conectar com o banco de dados do MongoLab do Heroku.
     * Para desenvolvimento local, usar sempre 'local'.
     */
    private final static String connection = "local";

    private DatabaseConnection(){}
    
    private static MongoDatabase localConnection() throws UnknownHostException{
       MongoClient mongoClient = new MongoClient( "localhost" , 27017 );
       MongoDatabase database = mongoClient.getDatabase("everemind");
       return database;
    }
    
    private static MongoDatabase herokuConnection() throws UnknownHostException{
        MongoClientURI connectionString = new MongoClientURI("");
        MongoClient mongoClient = new MongoClient(connectionString);
        MongoDatabase database = mongoClient.getDatabase("");
        return database;
    }

    public static synchronized MongoDatabase create(){
        try{
            if (connection.equals("heroku"))
                return herokuConnection();

            return localConnection();
        }
        catch (UnknownHostException e){
            Logger.getLogger(DatabaseConnection.class.getName()).log(Level.SEVERE, null, e);
            return null;
        }
    }
}
