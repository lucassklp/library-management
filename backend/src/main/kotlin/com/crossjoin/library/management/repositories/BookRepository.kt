package com.crossjoin.library.management.repositories

import com.crossjoin.library.management.entities.Book
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.stereotype.Repository

@Repository
interface BookRepository : PagingAndSortingRepository<Book, Int> {

}