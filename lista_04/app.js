//para rodar, usar node app.js

const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname));

const crud = require('./crud');

app.get('/', async (req, res) => {
  const musicas = await crud.selectMusicas();
  const artistas = await crud.selectArtistas();
  const albuns = await crud.selectAlbuns();

  musicas.forEach((musica) => {
    const artista = artistas.find((artista) => artista.id_artista === musica.id_artista);
    const album = albuns.find((album) => album.id_album === musica.id_album);
    if (artista) {
      musica.id_artista = artista.nome_artista;
    }
    if (album) {
      musica.id_album = album.titulo_album;
    }
  });

  res.render('index', { musicas, artistas, albuns });
});

app.get('/create', async (req, res) => {
  const artistas = await crud.selectArtistas();
  const albuns = await crud.selectAlbuns();
  const musicas = {
    artistas: artistas,
    albuns: albuns
  };
  res.render('create', { musicas });
});

app.post('/create/musica', async (req, res) => {
  const { titulo_musica, ano_lancamento_musica, id_artista_musica, id_album_musica, novo_artista_musica, novo_album_musica } = req.body;

  let idArtista;
  let idAlbum;

  if (novo_artista_musica) {
    const [result] = await crud.insertArtistas({ nome: novo_artista_musica });
    idArtista = result.insertId;
  } else {
    idArtista = id_artista_musica;
  }

  if (novo_album_musica) {
    const [result] = await crud.insertAlbuns({ titulo: novo_album_musica, ano: ano_lancamento_musica, id_artista: idArtista });
    idAlbum = result.insertId;
  } else {
    idAlbum = id_album_musica;
  }

  await crud.insertMusicas({ titulo: titulo_musica, ano: ano_lancamento_musica, artista: idArtista, album: idAlbum });

  res.redirect('/');
});

app.post('/create/artista', async (req, res) => {
  const { nome_artista } = req.body;
  await crud.insertArtistas({ nome: nome_artista });
  res.redirect('/');
});

app.post('/create/album', async (req, res) => {
  const { titulo_album, ano_lancamento_album, id_artista_album, novo_artista_album } = req.body;

  let idArtista;

  if (novo_artista_album) {
    const [result] = await crud.insertArtistas({ nome: novo_artista_album });
    idArtista = result.insertId;
  } else {
    idArtista = id_artista_album;
  }

  await crud.insertAlbuns({ titulo: titulo_album, ano: ano_lancamento_album, id_artista: idArtista });

  res.redirect('/');
});

app.get('/edit/musica/:id', async (req, res) => {
  const id = req.params.id;

  const musica = await crud.selectMusicaPorId(id);

  if (!musica) {
      return res.status(404).send('Música não encontrada');
  }

  const artistas = await crud.selectArtistas();
  const albuns = await crud.selectAlbuns();

  res.render('edit_musica', { musica, artistas, albuns });
});


app.get('/edit/artist/:id', async (req, res) => {
  const id = req.params.id;

  const artista = await crud.selectArtistaPorId(id);

  if (!artista) {
    return res.status(404).send('Artista não encontrado');
  }

  res.render('edit_artista', { artista });
});

app.post('/update/musica/:id', async (req, res) => {
  const id = req.params.id;
  const { titulo_musica, ano_lancamento_musica, id_artista_musica, id_album_musica } = req.body;

  await crud.updateMusicas(id, titulo_musica, ano_lancamento_musica, id_artista_musica, id_album_musica);

  res.redirect('/');
});

app.post('/update/artist/:id', async (req, res) => {
  const id = req.params.id;
  const { nome_artista } = req.body;

  await crud.updateArtistas(id, nome_artista);

  res.redirect('/');
});

app.post('/update/artista/:id', async (req, res) => {
  const id = req.params.id;
  const { nome_artista } = req.body;
  
  await crud.updateArtistas(id, nome_artista);

  res.redirect('/');
});

app.get('/delete/musica/:id', async (req, res) => {
  const id = req.params.id;

  await crud.deleteMusicas(id);

  res.redirect('/');
});

app.get('/delete/artist/:id', async (req, res) => {
  const id = req.params.id;

  await crud.deleteArtistas(id);

  res.redirect('/');
});

app.get('/edit/album/:id', async (req, res) => {
  const id = req.params.id;

  const album = await crud.selectAlbumPorId(id);
  const artistas = await crud.selectArtistas();

  if (!album) {
      return res.status(404).send('Álbum não encontrado');
  }

  res.render('edit_album', { album, artistas });
});

app.post('/update/album/:id', async (req, res) => {
  const id = req.params.id;
  const { titulo_album, ano_lancamento, id_artista } = req.body;

  await crud.updateAlbuns(id, titulo_album, ano_lancamento, id_artista);

  res.redirect('/');
});

app.get('/delete/album/:id', async (req, res) => {
  const id = req.params.id;

  await crud.deleteAlbuns(id);

  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
