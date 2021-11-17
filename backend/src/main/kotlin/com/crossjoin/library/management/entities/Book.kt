package com.crossjoin.library.management.entities

import java.time.LocalDate
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@Entity
data class Book(
        @Id
        @GeneratedValue
        var id: Int,

        @Column
        var title: String,

        @Column
        var description: String,

        @Column
        var isbn: String,

        @Column
        var isAvailable: Boolean,

        @Column
        var notes: String,

        @Column
        var owner: String?,

        @Column
        var returnDate: LocalDate?,

        @Column
        var loanDate: LocalDate?
)
