package com.crossjoin.library.management.dtos

import java.time.LocalDate
import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotNull

data class LendBookDto (
        @field:NotNull
        @field:NotBlank
        val owner: String,

        @field:NotNull
        @field:NotBlank
        val deliveryDate: LocalDate
)