/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package br.ufg.inf.everemind.entity;

/**
 *
 * @author Leonardo
 */


public class User {

    private String fullName;
    private String email;
    private String secondaryEmail;
    private String hash;

    public User() {}

    public User(String fullName, String email, String secondaryEmail) {
        this.fullName = fullName;
        this.email = email;
        this.secondaryEmail = secondaryEmail;
    }

    public User(String fullName, String email, String secondaryEmail, String hash) {
        this.fullName = fullName;
        this.email = email;
        this.secondaryEmail = secondaryEmail;
        this.hash = hash;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSecondaryEmail() {
        return secondaryEmail;
    }

    public void setSecondaryEmail(String secondaryEmail) {
        this.secondaryEmail = secondaryEmail;
    }

    public String getHash() {
        return hash;
    }

    public void setHash(String hash) {
        this.hash = hash;
    }
}