package com.anirudh.ecom_proj;

import com.anirudh.ecom_proj.model.Product;
import com.anirudh.ecom_proj.repo.ProductRepo;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.util.Date;

@Component
public class DataInitializer {

    @Autowired
    private ProductRepo productRepo;

    @PostConstruct
    public void init() throws IOException {
        if (productRepo.count() == 0) {

            // ---------- APPLE PRODUCTS ----------
            addProduct(
                    "iPhone 17 Pro",
                    "Apple’s next-gen smartphone featuring the A19 Pro chip and enhanced Dynamic Island.",
                    "Apple",
                    new BigDecimal("1199.00"),
                    "Smartphones",
                    true,
                    40,
                    "iphone17.jpg",
                    "image/jpeg"
            );

            addProduct(
                    "MacBook Pro M3",
                    "Powerful laptop with Apple M3 chip, 16GB unified memory, and a stunning Liquid Retina display.",
                    "Apple",
                    new BigDecimal("1999.00"),
                    "Laptops",
                    true,
                    25,
                    "macbook_pro.jpg",
                    "image/jpeg"
            );

            addProduct(
                    "AirPods Pro (2nd Gen)",
                    "Noise-cancelling wireless earbuds with adaptive transparency and spatial audio for immersive sound.",
                    "Apple",
                    new BigDecimal("249.00"),
                    "Accessories",
                    true,
                    60,
                    "airpods_pro.jpg",
                    "image/jpeg"
            );

            // ---------- SAMSUNG PRODUCTS ----------
            addProduct(
                    "Samsung Galaxy S25 Ultra",
                    "Samsung’s flagship smartphone featuring Snapdragon 8 Gen 4 and a 200MP quad camera system.",
                    "Samsung",
                    new BigDecimal("1099.00"),
                    "Smartphones",
                    true,
                    50,
                    "galaxy_s25_ultra.jpg",
                    "image/jpeg"
            );

            addProduct(
                    "Samsung Galaxy Book 4 Pro",
                    "Ultra-slim laptop with Intel Evo, AMOLED display, and Galaxy ecosystem connectivity.",
                    "Samsung",
                    new BigDecimal("1599.00"),
                    "Laptops",
                    true,
                    35,
                    "galaxy_book4.jpg",
                    "image/jpeg"
            );

            addProduct(
                    "Samsung Galaxy Watch 6",
                    "Smartwatch with vibrant AMOLED screen, ECG monitoring, and advanced fitness tracking.",
                    "Samsung",
                    new BigDecimal("399.00"),
                    "Wearables",
                    true,
                    70,
                    "galaxy_watch6.jpg",
                    "image/jpeg"
            );

            System.out.println("✅ Loaded Apple and Samsung products (6 items) with USD prices and images");
        }
    }

    private void addProduct(
            String name, String description, String brand,
            BigDecimal price, String category, boolean available,
            int stock, String imageName, String imageType
    ) throws IOException {

        Product p = new Product();
        p.setName(name);
        p.setDescription(description);
        p.setBrand(brand);
        p.setPrice(price);
        p.setCategory(category);
        p.setReleaseDate(new Date());
        p.setProductAvailable(available);
        p.setStockQuantity(stock);
        p.setImageName(imageName);
        p.setImageType(imageType);

        // Load image from /resources/static/images
        ClassPathResource img = new ClassPathResource("static/images/" + imageName);
        byte[] imageBytes = Files.readAllBytes(img.getFile().toPath());
        p.setImageDate(imageBytes);

        productRepo.save(p);
    }
}
