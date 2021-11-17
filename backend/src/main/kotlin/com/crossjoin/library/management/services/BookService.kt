package com.crossjoin.library.management.services

import com.crossjoin.library.management.dtos.BookDto
import com.crossjoin.library.management.entities.Book
import com.crossjoin.library.management.repositories.BookRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service

@Service
class BookService @Autowired constructor(private val bookRepository: BookRepository)  {

    fun create(dto: BookDto): Book = bookRepository.save(Book(
        id = 0,
        title = dto.title,
        description = dto.description,
        isbn = dto.isbn,
        isAvailable = dto.isAvailable,
        notes = dto.notes,
        loanDate = null,
        returnDate = null
    ))

    fun list(pageable: Pageable): Page<Book> = bookRepository.findAll(pageable)

}