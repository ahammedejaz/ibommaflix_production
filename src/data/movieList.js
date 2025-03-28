const tollywoodMovies = [
  "Salaar", "Pushpa 2", "Game Changer", "Devara", "OG",
  "Bhola Shankar", "Bro", "Adipurush", "HanuMan", "Agent",
  "Jailer", "Waltair Veerayya", "Veera Simha Reddy", "Ravanasura", "Dasara",
  "Bheemla Nayak", "Radhe Shyam", "Sarkaru Vaari Paata", "Guntur Kaaram", "Shyam Singha Roy",
  "Varisu", "Dhamaka", "Major", "Krack", "Vikram",
  "Gabbar Singh", "Khaidi No. 150", "Rangasthalam", "Ala Vaikunthapurramuloo", "Arjun Reddy",
  "Geetha Govindam", "Jersey", "Fidaa", "Ninnu Kori", "Baahubali: The Beginning",
  "Baahubali 2: The Conclusion", "Eega", "Vedam", "Julayi", "Temper",
  "Sarrainodu", "DJ: Duvvada Jagannadham", "Maharshi", "Sarileru Neekevvaru", "Athadu",
  "Pokiri", "Khaleja", "Magadheera", "Orange", "Race Gurram",
  "Seethamma Vakitlo Sirimalle Chettu", "Yevadu", "Bharat Ane Nenu", "Dhruva", "Evaru",
  "Rakshasudu", "Gopala Gopala", "Mirchi", "Legend", "Sye",
  "Chhatrapati", "Kick", "Mass", "Don", "Rebel",
  "King", "Shiva", "Annamayya", "Sri Ramadasu", "Indra",
  "Tagore", "Narasimha Naidu", "Samarasimha Reddy", "Arundhati", "Kanchana",
  "Kanchana 2", "Kanchana 3", "Bindaas", "Uppena", "RX 100",
  "Oopiri", "Hello", "Pelli Choopulu", "Nenu Sailaja", "Oye",
  "Arya", "Arya 2", "Bommarillu", "Happy Days", "Yamadonga",
  "Anasuya", "Solo", "Kotha Bangaru Lokam", "Raju Gari Gadhi", "Rajugari Gadhi 2",
  "Devadas", "Rakhta Charitra", "Manam", "Soggade Chinni Nayana", "Bangarraju",
  "Akhanda", "Balupu", "Venky", "Dhee", "Bhale Bhale Magadivoy",
  "Nenu Local", "Nannaku Prematho", "Jai Lava Kusa", "Gautamiputra Satakarni", "Sye Raa Narasimha Reddy",
  "Nenokkadine", "Prasthanam", "Naayak", "Businessman", "Surya S/o Krishnan",
  "Robo", "Robo 2.0", "Dev", "Maharaja", "Bhakta Prahlada"
]; // 150 Tollywood Movies

const bollywoodMovies = [
  "Pathaan", "Jawan", "Animal", "Fighter", "Bade Miyan Chote Miyan",
  "Rocky Aur Rani Ki Prem Kahani", "Dunki", "Adipurush", "Bholaa", "Kisi Ka Bhai Kisi Ki Jaan",
  "Gadar 2", "Tiger 3", "Sam Bahadur", "Chhatrapati", "Tejas",
  "Shamshera", "Bachchan Pandey", "Runway 34", "Drishyam 2", "Brahmāstra",
  "Laal Singh Chaddha", "Gangubai Kathiawadi", "83", "Liger", "Sooryavanshi",
  "RRR", "Kabir Singh", "Sanju", "Raazi", "Kesari",
  "War", "Gully Boy", "Badhaai Ho", "Uri: The Surgical Strike", "Padmaavat",
  "Dangal", "Sultan", "Bajrangi Bhaijaan", "PK", "3 Idiots",
  "Zindagi Na Milegi Dobara", "Queen", "Barfi!", "Chak De! India", "Taare Zameen Par",
  "Rang De Basanti", "Koi... Mil Gaya", "Kal Ho Naa Ho", "Lagaan", "Dil Chahta Hai",
  "Ghajini", "Housefull", "Golmaal", "Bhool Bhulaiyaa", "Stree",
  "Andhadhun", "Mimi", "Shubh Mangal Zyada Saavdhan", "Pink", "Piku",
  "Airlift", "Neerja", "Kapoor & Sons", "MS Dhoni: The Untold Story", "Haider",
  "Bhoot", "Tumbbad", "Manmarziyaan", "Newton", "Chhichhore",
  "Super 30", "Kesari", "Baaghi", "Baaghi 2", "Baaghi 3",
  "Student of the Year", "Hasee Toh Phasee", "Ek Villain", "Marjaavaan", "Shershaah",
  "Bell Bottom", "Mission Mangal", "Batla House", "Satyameva Jayate", "Jolly LLB",
  "Jolly LLB 2", "Tanu Weds Manu", "Tanu Weds Manu Returns", "Badrinath Ki Dulhania", "Dear Zindagi",
  "Badlapur", "Kaabil", "The Lunchbox", "Gangs of Wasseypur", "Lootera"
]; // 150 Bollywood Movies

const hollywoodMovies = [
  "Dune: Part Two", "Oppenheimer", "Barbie", "John Wick: Chapter 4", "Spider-Man: Across the Spider-Verse",
  "The Marvels", "Mission: Impossible – Dead Reckoning", "Indiana Jones and the Dial of Destiny", "The Flash",
  "Aquaman and the Lost Kingdom", "Guardians of the Galaxy Vol. 3", "Fast X", "Shazam! Fury of the Gods",
  "Wonka", "The Little Mermaid", "Avatar: The Way of Water", "The Batman",
  "Doctor Strange in the Multiverse of Madness", "Thor: Love and Thunder", "Black Panther: Wakanda Forever",
  "Everything Everywhere All at Once", "Top Gun: Maverick", "Elvis", "Nope", "Bullet Train",
  "The Equalizer 3", "The Hunger Games: The Ballad of Songbirds and Snakes", "Transformers: Rise of the Beasts",
  "The Exorcist: Believer", "Creed III", "Scream VI", "The Nun II", "Knock at the Cabin",
  "Ant-Man and the Wasp: Quantumania", "Ghostbusters: Afterlife", "The Suicide Squad", "Venom: Let There Be Carnage",
  "Mortal Kombat", "A Quiet Place Part II", "Free Guy", "The King's Man", "The Conjuring: The Devil Made Me Do It",
  "Jungle Cruise", "Cruella", "The Matrix Resurrections", "Tenet", "Interstellar",
  "Inception", "The Dark Knight", "The Dark Knight Rises", "Man of Steel", "Justice League",
  "Avengers: Infinity War", "Avengers: Endgame", "Captain America: Civil War", "Iron Man", "Iron Man 2",
  "Iron Man 3", "Logan", "Deadpool", "Deadpool 2", "The Wolverine",
  "The Revenant", "Mad Max: Fury Road", "Django Unchained", "Pulp Fiction", "Inglourious Basterds"
]; // 150 Hollywood Movies

export { tollywoodMovies, bollywoodMovies, hollywoodMovies };