package com.crossjoin.library.management.entities

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id

@Entity
data class Book(
        @Id
        val id: String,

        @Column
        val title: String,

        @Column
        val description: String,

        @Column
        val isbn: String,

        @Column
        val isAvailable: Boolean
)
