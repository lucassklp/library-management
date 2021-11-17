package com.crossjoin.library.management.dtos

import java.time.LocalDate

data class LendBookDto (
        val owner: String,
        val returnDate: LocalDate,
        val loanDate: LocalDate)