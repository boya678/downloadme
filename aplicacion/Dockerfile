# Imagen base oficial de Node.js
FROM node:20

# Crear y usar un directorio de trabajo
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json si existe
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código de la app
COPY . .

# Exponer el puerto (opcional, útil para documentación)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD [ "node", "index.js" ]
