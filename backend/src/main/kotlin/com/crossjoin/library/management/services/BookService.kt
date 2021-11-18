package com.crossjoin.library.management.services

import com.crossjoin.library.management.dtos.BookDto
import com.crossjoin.library.management.dtos.LendBookDto
import com.crossjoin.library.management.entities.Book
import com.crossjoin.library.management.repositories.BookRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import java.time.LocalDate
import java.util.*

@Service
class BookService @Autowired constructor(private val bookRepository: BookRepository)  {

    fun create(dto: BookDto): Book = bookRepository.save(Book(
        id = 0,
        title = dto.title,
        description = dto.description,
        isbn = dto.isbn,
        isAvailable = true,
        notes = dto.notes,
        loanDate = null,
        deliveryDate = null,
        owner = null
    ))

    fun list(pageable: Pageable): Page<Book> = bookRepository.findAll(pageable)

    fun lendBook(id: Int, dto: LendBookDto): Optional<Book> = bookRepository.findById(id).map {
        it.owner = dto.owner
        it.loanDate = LocalDate.now()
        it.deliveryDate = dto.deliveryDate
        it.isAvailable = false
        bookRepository.save(it)
    }

    fun receiveBook(id: Int): Optional<Book> = bookRepository.findById(id).map {
        it.owner = null
        it.deliveryDate = null
        it.loanDate = null
        it.isAvailable = true
        bookRepository.save(it)
    }
}