// App.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const API_KEY = '52d00d6c681b49a8bfe299e63bdd02fd'; // Replace with your actual key

export default function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Fetch articles from News API
  useEffect(() => {
    console.log('Fetching articles...'); // Log for debugging

    axios
      .get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)
      .then((res) => {
        console.log('Articles fetched:', res.data.articles); // Log fetched data
        setArticles(res.data.articles);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching articles:', err);
        setLoading(false);
      });
  }, []);

  const handleArticleSelect = (article) => {
    setSelectedArticle(article);
  };

  const handleBackToHome = () => {
    setSelectedArticle(null);
  };

  // If an article is selected, show details
  if (selectedArticle) {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>{selectedArticle.title}</Text>
          {selectedArticle.urlToImage && (
            <Image source={{ uri: selectedArticle.urlToImage }} style={styles.image} />
          )}
          <Text style={styles.content}>{selectedArticle.content || selectedArticle.description}</Text>
        </ScrollView>
        <TouchableOpacity onPress={handleBackToHome} style={styles.button}>
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // If data is loading
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading news...</Text>
      </View>
    );
  }

  // If no articles are available
  if (!articles.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.noArticles}>No news articles available at the moment. Please try again later.</Text>
      </View>
    );
  }

  // Display list of articles in grid
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.Title}> Latest News </Text>
      </View>
      <FlatList
        data={articles}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2} // This creates a grid layout with 2 columns
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleArticleSelect(item)} style={styles.card}>
            {item.urlToImage && <Image source={{ uri: item.urlToImage }} style={styles.imagePreview} />}
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description || 'No description available'}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginBottom: 16,
    marginHorizontal: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    padding: 16,
  },
  imagePreview: {
    height: 200,
    borderRadius: 8,
    width: '100%',
    marginBottom: 10,
    resizeMode: 'cover',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  Title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    alignSelf:"center",
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginBottom: 20,
    textAlign: 'justify',
  },
  loadingText: {
    fontSize: 18,
    color: '#4CAF50',
    marginTop: 10,
  },
  noArticles: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    width: "40%",
    marginTop: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
