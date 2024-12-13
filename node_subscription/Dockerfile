# Używamy obrazu Node.js
FROM node:16

# Ustawiamy katalog roboczy
WORKDIR /app

# Kopiujemy pliki projektu
COPY package*.json ./
RUN npm install

# Kopiujemy resztę aplikacji
COPY . .

# Otwieramy port dla WebSocket
EXPOSE 4000

# Uruchamiamy serwer
CMD ["node", "index.js"]
