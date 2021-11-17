package com.crossjoin.library.management.controllers

import com.crossjoin.library.management.dtos.BookDto
import com.crossjoin.library.management.services.BookService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.PageRequest
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*

@Validated
@RestController("/api/book")
class BookController @Autowired constructor(private val bookService: BookService) {

    @PostMapping
    fun create(@RequestBody book: BookDto) = bookService.create(book)

    @GetMapping
    fun create(@RequestParam("page") page: Int, @RequestParam("size") size: Int) =
            bookService.list(PageRequest.of(page, size))

}