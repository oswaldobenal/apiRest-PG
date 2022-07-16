export default {
  cat: {
    type: "gato",
    colors: ['Ante / Bronceado / Beige', 'Ante y Blanco', 'Azul Crema', 'Blanco', 'Calicó', 'Siamés Crema', 'Crema / Marfil', 'Dilute Calicó', 'Dilute Tortoiseshell', 'Gris / Azulado / Plata', 'Gris y Blanco', 'Lilac Point', 'Marrón / Chocolate', 'Naranja y Blanco', 'Naranja y Rojo', 'Persa Smoke', 'Siamés ', 'Siamés Chocolate', 'Siamés Red Point', 'Siamés Seal Point', 'Tabby (Ante / Bronceado / Beige)', 'Tabby (Atigrado)', 'Tabby (Gris / Azulado / Plata)', 'Tabby (Leopardo / Manchado)', 'Tabby (Marrón / Chocolate)', 'Tabby (Naranja / Rojo)', 'Torbie', 'Tortoiseshell', 'Banco y Negro']
  },
  dog: {
    type: "perro",
    colors: ['Amarillo / Bronceado / Rubio /', 'Beige', 'Arlequín', 'Atigrado', 'Beige', 'Bicolor', 'Blanco / Crema', 'Golden', 'Gris / Azulado / Plata', 'Marrón / Chocolate', 'Merlé (Azul)', 'Merlé (Rojo)', 'Negro', 'Rojo / Castaño / Naranja', 'Sable', 'Tricolor (Marrón, Negro y Blanco)']
  },
  coats: ['sin pelo', 'corto', 'mediano', 'largo', 'ondulado', 'rizado'],
  ages: ['cachorro', 'joven', 'adulto', 'adulto mayor'],
  healths: ['vacunas al dia', 'no vacunado'],
  status: ['adoptable', 'adoptado'],
  sizes: ['pequeño', 'mediano', 'grande', 'extra grande'],
  tags: ['amigable', 'cariñoso', 'protector', 'inteligente', 'divertido', 'tranquilo'],
  genders: ['hembra', 'macho'],
  pets: [
    {
      userId: 1,
      name: "firulays",
      typeId: "dog",
      breedId: 2,
      colorId: 31,
      age: "joven",
      gender: "macho",
      size: "mediano",
      coat: "largo",
      health: "vacunas al dia",
      description: "perro feliz",
      tags: ["amigable", "cariñoso"],
      castrated: false,
      attributes: { "house_trained": true, "special_needs": false },
      environment: { "children": true, "dogs": null, "cats": null },
      color: "marron",
      status: "adoptable",
      photos: []
    }
  ]
}