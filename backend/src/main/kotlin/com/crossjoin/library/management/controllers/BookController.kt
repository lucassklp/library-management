package com.crossjoin.library.management.controllers

import com.crossjoin.library.management.dtos.BookDto
import com.crossjoin.library.management.dtos.LendBookDto
import com.crossjoin.library.management.entities.Book
import com.crossjoin.library.management.services.BookService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.PageRequest
import org.springframework.http.ResponseEntity
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*

@Validated
@RestController
@RequestMapping("/api/book")
class BookController @Autowired constructor(private val bookService: BookService) {

    @GetMapping
    fun list(@RequestParam("page") page: Int, @RequestParam("size") size: Int) =
            bookService.list(PageRequest.of(page, size))

    @PostMapping
    fun create(@RequestBody book: BookDto) = bookService.create(book)

    @PutMapping("{id}")
    fun edit(@PathVariable("id") id: Int, @RequestBody dto: BookDto): ResponseEntity<Book> = bookService.edit(id, dto)
            .map { ResponseEntity.ok(it) }
            .orElseGet { ResponseEntity.notFound().build() }

    @DeleteMapping("{id}")
    fun delete(@PathVariable("id") id: Int) = bookService.delete(id)


    @PutMapping("{id}/lend")
    fun lendBook(@PathVariable("id") id: Int, @RequestBody dto: LendBookDto): ResponseEntity<Book> {
        return bookService.lendBook(id, dto)
                .map { ResponseEntity.ok(it) }
                .orElseGet { ResponseEntity.notFound().build() }
    }

    @PutMapping("{id}/receive")
    fun receiveBook(@PathVariable("id") id: Int): ResponseEntity<Book> {
        return bookService.receiveBook(id)
                .map { ResponseEntity.ok(it) }
                .orElseGet { ResponseEntity.notFound().build() }
    }

}