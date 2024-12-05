const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Налаштування для отримання JSON з тіла запиту
app.use(express.json());

// Обробка POST запиту на реєстрацію
app.post('/register', (req, res) => {
  const userData = req.body;

  // Якщо майстер, записуємо в masters.json, якщо користувач - в users.json
  const fileName = userData.services ? 'masters.json' : 'users.json';
  
  // Зчитуємо поточні дані з файлу
  fs.readFile(fileName, (err, data) => {
    if (err) {
      return res.status(500).send({ message: 'Помилка при зчитуванні файлу.' });
    }

    let users = JSON.parse(data);
    users.push(userData);

    // Записуємо нові дані в файл
    fs.writeFile(fileName, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).send({ message: 'Помилка при запису даних.' });
      }
      res.status(200).send({ message: 'Дані успішно збережено!' });
    });
  });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
