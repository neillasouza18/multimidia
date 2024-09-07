type Music = {
    name: string;
    author: string;
    description: string;
    urlAudio: string;
    image: string;
}

export const musics: Music[] = [
    {
        name: "Hoje á noite",
        author: "Calcinha Preta",
        description: "musica 01",
        urlAudio: "audios/audio1.mp3",
        image: 'https://originalouversao.com.br/assets/img/artistas/Calcinha_Preta_1600179776.jpg',
    },
    {
        name: "O tempo não para",
        author: "Cazuza",
        description: "musica 02",
        urlAudio: "audios/audio2.mp3",
        image: 'https://uploads.emaisgoias.com.br/2022/04/29d10f76-o-tempo-nao-para-cazuza-ineditas.jpeg',
    },
    {
        name: "Movimento da Sanfoninha",
        author: "Anitta",
        description: "musica 03",
        urlAudio: "audios/audio3.mp3",
        image:'https://i.ytimg.com/vi/gN5JccHongU/maxresdefault.jpg',
    }
]