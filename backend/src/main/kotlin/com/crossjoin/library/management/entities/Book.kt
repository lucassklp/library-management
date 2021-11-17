package com.crossjoin.library.management.entities

import java.time.LocalDate
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id

@Entity
data class Book(
        @Id
        val id: Int,

        @Column
        val title: String,

        @Column
        val description: String,

        @Column
        val isbn: String,

        @Column
        val isAvailable: Boolean,

        @Column
        val notes: String,

        @Column
        val returnDate: LocalDate?,

        @Column
        val loanDate: LocalDate?
)
