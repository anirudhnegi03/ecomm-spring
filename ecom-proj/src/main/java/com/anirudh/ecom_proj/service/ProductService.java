package com.anirudh.ecom_proj.service;

import com.anirudh.ecom_proj.model.Product;
import com.anirudh.ecom_proj.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepo repo;

    public List<Product> getAllProducsts() {
        return repo.findAll();
    }

    public Product getProductById(int id) {
        return repo.findById(id).orElse(null);
    }

    public Product addProduct(Product product, MultipartFile imageFile) throws IOException {
        product.setImageName(imageFile.getOriginalFilename());
        product.setImageType(imageFile.getContentType());
        product.setImageDate(imageFile.getBytes());
        return repo.save(product);

    }

    public Product updateProduct(int id, Product updatedProduct, MultipartFile imageFile) throws IOException {
    Product existingProduct = repo.findById(id).orElse(null);
    if (existingProduct == null) {
        return null; 
    }

    
    existingProduct.setName(updatedProduct.getName());
    existingProduct.setDescription(updatedProduct.getDescription());
    existingProduct.setBrand(updatedProduct.getBrand());
    existingProduct.setCategory(updatedProduct.getCategory());
    existingProduct.setPrice(updatedProduct.getPrice());
    existingProduct.setStockQuantity(updatedProduct.getStockQuantity());
    existingProduct.setProductAvailable(updatedProduct.isProductAvailable());
    existingProduct.setReleaseDate(updatedProduct.getReleaseDate());

    
    if (imageFile != null && !imageFile.isEmpty()) {
        existingProduct.setImageDate(imageFile.getBytes());
        existingProduct.setImageName(imageFile.getOriginalFilename());
        existingProduct.setImageType(imageFile.getContentType());
    }

    return repo.save(existingProduct);
}


    public void deleteProduct(int id) {
        repo.deleteById(id);
    }

    public List<Product> searchProducts(String keyword) {
        return repo.searchProducts(keyword);
    }
}

