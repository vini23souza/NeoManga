# models.py
# Arquivo de estrutura de banco de dados (Models) do Django/SQLite

from django.db import models
from django.contrib.auth.models import User # Para Login/Cadastro

# 1. Tabela para os Mangás (Conteúdo da plataforma)
class Manga(models.Model):
    titulo = models.CharField(max_length=200)
    autor = models.CharField(max_length=100)
    genero = models.CharField(max_length=50)
    capa_url = models.URLField()
    
    def _str_(self):
        return self.titulo

# 2. Tabela para ligar o Usuário aos Favoritos (Funcionalidade)
class ListaDeFavoritos(models.Model):
    # Conexão com o sistema de Login (User)
    usuario = models.OneToOneField(User, on_delete=models.CASCADE)
    # Conexão com a lista de Mangás Favoritos (Many To Many)
    mangas = models.ManyToManyField(Manga)
    
    def _str_(self):
        return f"Lista de Favoritos de {self.usuario.username}"
# O SQLite armazenaria todas estas tabelas.