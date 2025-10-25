
import { Service } from './types';

export const SERVICES: Service[] = [
  {
    "nomService": "Photographie Shooting UltraRéaliste",
    "description": "Génération d'images ultra-réalistes à partir d'une image de référence fournie par le client, avec retouches naturelles peau et visage.",
    "optionsFormulaire": [
      {"nom": "Image de référence", "type": "upload", "required": true},
      {"nom": "Type de prise de vue", "type": "dropdown", "options": ["Portrait", "Mode", "Produit", "Paysage", "Architecture"]},
      {"nom": "Style de photo", "type": "dropdown", "options": ["Naturel", "Studio", "Cinematic", "Artistique", "Noir & Blanc"]},
      {"nom": "Éclairage", "type": "dropdown", "options": ["Lumière naturelle", "Studio lumière", "Ambiance dramatique", "Spotlight"]},
      {"nom": "Retouches", "type": "checkbox", "options": ["Peau parfaite", "Amélioration visage", "Correction couleur", "Nettoyage arrière-plan"]},
      {"nom": "Format rendu", "type": "dropdown", "options": ["PNG", "JPEG", "TIFF"]},
      {"nom": "Nombre de résultats maximum", "type": "number", "default": 1, "max": 1},
      {"nom": "Commentaires supplémentaires", "type": "textarea"}
    ],
    "fonctionnalités": [
      "Téléchargement gratuit après génération",
      "Rendu ultra-réaliste et professionnel",
      "Interface simple et claire pour tous les niveaux"
    ]
  },
  {
    "nomService": "Générateur d'Image Photoshop",
    "description": "Génération et retouche d'image comme un designer professionnel Photoshop.",
    "optionsFormulaire": [
      {"nom": "Image de référence (optionnelle)", "type": "upload", "required": false},
      {"nom": "Champ de description", "type": "textarea", "required": true, "placeholder": "Décrivez ce que vous souhaitez générer ou modifier..."},
      {"nom": "Retouche", "type": "checkbox", "options": ["Recadrer", "Filtre", "Dessiner", "Correction couleur", "Ajout texte", "Effets spéciaux"]},
      {"nom": "Format rendu", "type": "dropdown", "options": ["PNG", "JPEG"]},
      {"nom": "Commentaires supplémentaires", "type": "textarea"}
    ],
    "fonctionnalités": [
      "Téléchargement gratuit après génération",
      "Options professionnelles pour travailler comme un designer Photoshop",
      "Interface intuitive et fluide"
    ]
  },
  {
    "nomService": "Générateur Vidéo VEO IA",
    "description": "Création de vidéos IA à partir d'une description textuelle, avec contrôle sur durée, qualité et format.",
    "optionsFormulaire": [
      {"nom": "Champ de description", "type": "textarea", "required": true, "placeholder": "Décrivez la vidéo à générer..."},
      {"nom": "Image de référence (optionnelle)", "type": "upload", "required": false},
      {"nom": "Durée vidéo (secondes)", "type": "number", "default": 10},
      {"nom": "Qualité", "type": "dropdown", "options": ["Standard", "HD", "4K"]},
      {"nom": "Format", "type": "dropdown", "options": ["MP4", "MOV", "AVI"]},
      {"nom": "Commentaires supplémentaires", "type": "textarea"}
    ],
    "fonctionnalités": [
      "Téléchargement gratuit après génération",
      "Interface premium et simple",
      "Une seule vidéo générée par demande"
    ]
  }
];
