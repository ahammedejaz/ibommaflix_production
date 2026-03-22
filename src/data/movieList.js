const tollywoodMovies = [
  // 2025-2026 Latest
  "Pushpa 2", "Game Changer", "Daaku Maharaaj", "Sankranthiki Vasthunnam", "OG",
  "Akhanda 2", "Robinhood", "Kubera", "Double iSmart", "Saripodhaa Sanivaaram",
  "Lucky Baskhar", "Thandel", "Daku Maharaj", "Devara", "Kalki 2898 AD",
  "Salaar", "HanuMan", "Guntur Kaaram", "Tillu Square", "Eagle",
  "Aadikeshava", "Hi Nanna", "Kushi", "Bhimaa", "Bro",
  // 2023-2024
  "Dasara", "Waltair Veerayya", "Veera Simha Reddy", "Adipurush", "Agent",
  "Dhamaka", "Virupaksha", "Balagam", "Baby", "Miss Shetty Mr Polishetty",
  "Extra Ordinary Man", "Skanda", "Bhagavanth Kesari", "Leo", "Jailer",
  // Blockbusters
  "Baahubali: The Beginning", "Baahubali 2: The Conclusion", "RRR", "Pushpa: The Rise",
  "Rangasthalam", "Ala Vaikunthapurramuloo", "Arjun Reddy", "Geetha Govindam",
  "Jersey", "Fidaa", "Magadheera", "Pokiri", "Athadu",
  "Bheemla Nayak", "Sarkaru Vaari Paata", "Vakeel Saab", "Uppena",
  "Sarileru Neekevvaru", "Maharshi", "Bharat Ane Nenu", "Dhruva",
  "Eega", "Temper", "Sarrainodu", "Gabbar Singh", "Julayi",
  "Race Gurram", "Mirchi", "Oopiri", "Bommarillu", "Happy Days",
  "Pelli Choopulu", "Nannaku Prematho", "Sye Raa Narasimha Reddy",
  "Akhanda", "Krack", "Radhe Shyam", "Major", "Shyam Singha Roy",
  "Kick", "Chatrapathi", "Vikram", "Robo", "Khaleja",
  "Manam", "Soggade Chinni Nayana", "Bhale Bhale Magadivoy",
  "Jai Lava Kusa", "Gautamiputra Satakarni", "Indra", "Tagore"
];

const bollywoodMovies = [
  // 2025-2026 Latest
  "Sky Force", "Emergency", "Azaad", "Fateh", "Raid 2",
  "Baby John", "Singham Again", "Bhool Bhulaiyaa 3", "Pushpa 2: The Rule",
  "Stree 2", "Khel Khel Mein", "Vedaa", "Auron Mein Kahan Dum Tha",
  "Chandu Champion", "Munjya", "Kalki 2898 AD", "Bad Newz",
  "Sarfira", "Khiladi", "Bade Miyan Chote Miyan", "Shaitaan",
  // 2023-2024
  "Pathaan", "Jawan", "Animal", "Fighter", "Crew",
  "Teri Baaton Mein Aisa Uljha Jiya", "Rocky Aur Rani Ki Prem Kahani",
  "Dunki", "Tiger 3", "Sam Bahadur", "12th Fail", "Gadar 2",
  "The Kerala Story", "OMG 2", "Dream Girl 2", "Fukrey 3",
  // 2022
  "Drishyam 2", "Brahmastra", "Gangubai Kathiawadi", "Bhool Bhulaiyaa 2",
  "Darlings", "Laal Singh Chaddha", "An Action Hero",
  // Blockbusters
  "Dangal", "PK", "3 Idiots", "Bajrangi Bhaijaan", "Sultan",
  "Uri: The Surgical Strike", "War", "Kabir Singh", "Sanju",
  "Gully Boy", "Andhadhun", "Padmaavat", "Raazi",
  "Badhaai Ho", "Stree", "Chhichhore", "Shershaah",
  "Sooryavanshi", "RRR", "Kesari", "Airlift", "Neerja",
  "MS Dhoni: The Untold Story", "Kapoor & Sons", "Pink", "Piku",
  "Queen", "Barfi!", "Zindagi Na Milegi Dobara", "Rang De Basanti",
  "Chak De! India", "Taare Zameen Par", "Lagaan", "Dil Chahta Hai",
  "Ghajini", "Golmaal", "Super 30", "Newton", "Tumbbad",
  "Gangs of Wasseypur", "The Lunchbox", "Jolly LLB 2",
  "Tanu Weds Manu Returns", "Dear Zindagi", "Haider"
];

const hollywoodMovies = [
  // 2025-2026 Latest
  "Captain America: Brave New World", "Thunderbolts", "The Fantastic Four: First Steps",
  "Superman", "Jurassic World Rebirth", "Mission: Impossible 8",
  "Avatar 3", "Blade", "The Accountant 2", "28 Years Later",
  "Lilo & Stitch", "Elio", "Zootopia 2", "Tron: Ares",
  "Snow White", "A Minecraft Movie", "How to Train Your Dragon",
  "Karate Kid: Legends", "Sinners", "Ballerina",
  // 2024
  "Dune: Part Two", "Deadpool & Wolverine", "Inside Out 2", "Gladiator II",
  "Moana 2", "Wicked", "Venom: The Last Dance", "Beetlejuice Beetlejuice",
  "The Wild Robot", "Alien: Romulus", "Furiosa: A Mad Max Saga",
  "Godzilla x Kong: The New Empire", "Kingdom of the Planet of the Apes",
  "Twisters", "It Ends with Us", "Despicable Me 4", "Bad Boys: Ride or Die",
  "A Quiet Place: Day One", "Joker: Folie à Deux",
  // 2023
  "Oppenheimer", "Barbie", "John Wick: Chapter 4", "Spider-Man: Across the Spider-Verse",
  "Guardians of the Galaxy Vol. 3", "The Hunger Games: The Ballad of Songbirds and Snakes",
  "Wonka", "Killers of the Flower Moon", "Napoleon",
  // Blockbusters
  "Top Gun: Maverick", "Everything Everywhere All at Once", "Avatar: The Way of Water",
  "The Batman", "Interstellar", "Inception", "The Dark Knight",
  "Avengers: Endgame", "Avengers: Infinity War", "Iron Man",
  "Logan", "Deadpool", "Deadpool 2", "Mad Max: Fury Road",
  "The Revenant", "Django Unchained", "Pulp Fiction",
  "Inglourious Basterds", "Free Guy", "Bullet Train",
  "The Equalizer 3", "Creed III", "The Suicide Squad",
  "Tenet", "The Dark Knight Rises", "Captain America: Civil War"
];

export { tollywoodMovies, bollywoodMovies, hollywoodMovies };
