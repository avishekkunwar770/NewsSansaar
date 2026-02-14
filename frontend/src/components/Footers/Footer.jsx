import React from 'react'

 const Footer = () => {
  return (
     <footer class="bg-gray-900 text-white py-16">
    <div class="container mx-auto px-6">
        <div class="grid md:grid-cols-4 gap-8 mb-12">
            <div>
                <h2 class="text-2xl font-bold">Brand<span class="text-primary">Name</span></h2>
                <p class="text-gray-400 mt-2">Creating amazing digital experiences since 2010.</p>
            </div>
            <div>
                <h3 class="text-lg font-semibold mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-1 after:bg-primary">Quick Links</h3>
                <ul class="space-y-2">
                    <li><a href="#home" class="text-gray-400 hover:text-primary transition">Home</a></li>
                    <li><a href="#technology" class="text-gray-400 hover:text-primary transition">tec</a></li>
                    <li><a href="#sport" class="text-gray-400 hover:text-primary transition">business</a></li>
                    <li><a href="#technology" class="text-gray-400 hover:text-primary transition">technologu</a></li>
                   
                </ul>
            </div>
            <div>
                <h3 class="text-lg font-semibold mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-1 after:bg-primary">Our Services</h3>
                <ul class="space-y-2">
                    <li><a href="#" class="text-gray-400 hover:text-primary transition">Web Design</a></li>
                    <li><a href="#" class="text-gray-400 hover:text-primary transition">Web Development</a></li>
                    <li><a href="#" class="text-gray-400 hover:text-primary transition">E-commerce</a></li>
                    <li><a href="#" class="text-gray-400 hover:text-primary transition">Digital Marketing</a></li>
                    <li><a href="#" class="text-gray-400 hover:text-primary transition">Branding</a></li>
                    <li><a href="#" class="text-gray-400 hover:text-primary transition">SEO Optimization</a></li>
                </ul>
            </div>
            <div>
                <h3 class="text-lg font-semibold mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-1 after:bg-primary">Newsletter</h3>
                <p class="text-gray-400 mb-4">Subscribe to our newsletter to receive updates and news.</p>
                
            </div>
        </div>
        <div class="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
            <div class="flex space-x-6 mb-4 md:mb-0">
                <a href="#" class="text-gray-400 hover:text-primary transition">Facebook</a>
                <a href="#" class="text-gray-400 hover:text-primary transition">Twitter</a>
                <a href="#" class="text-gray-400 hover:text-primary transition">Instagram</a>
                <a href="#" class="text-gray-400 hover:text-primary transition">LinkedIn</a>
            </div>
            <p class="text-gray-400">&copy; 2025 BrandName. All Rights Reserved.</p>
        </div>
    </div>
</footer>  


  )
}
