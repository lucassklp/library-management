package com.crossjoin.library.management.dtos

import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotNull

data class BookDto (
        @field:NotNull
        @field:NotBlank
        val title: String,

        @field:NotNull
        @field:NotBlank
        val description: String,

        @field:NotNull
        @field:NotBlank
        val isbn: String,

        @field:NotNull
        @field:NotBlank
        val notes: String
)