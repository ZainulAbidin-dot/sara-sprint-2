import mongoose from 'mongoose';

import DiseaseType from '../../src/models/disease-type.model.js';

const diseaseTypes = [
  { name: "Alzheimer's Disease", type: 'Neurological Disorders' },
  { name: "Parkinson's Disease", type: 'Neurological Disorders' },
  { name: 'Multiple Sclerosis (MS)', type: 'Neurological Disorders' },
  {
    name: 'Amyotrophic Lateral Sclerosis (ALS)',
    type: 'Neurological Disorders',
  },
  { name: 'Epilepsy', type: 'Neurological Disorders' },
  { name: 'Heart Failure', type: 'Cardiovascular Diseases' },
  { name: 'Coronary Artery Disease (CAD)', type: 'Cardiovascular Diseases' },
  { name: 'Atrial Fibrillation', type: 'Cardiovascular Diseases' },
  { name: 'Peripheral Artery Disease', type: 'Cardiovascular Diseases' },
  { name: 'Breast Cancer', type: 'Oncology (Cancer)' },
  { name: 'Lung Cancer', type: 'Oncology (Cancer)' },
  { name: 'Leukemia', type: 'Oncology (Cancer)' },
  { name: 'Glioblastoma', type: 'Oncology (Cancer)' },
  { name: 'Pancreatic Cancer', type: 'Oncology (Cancer)' },
  { name: "Crohn's Disease", type: 'Autoimmune Diseases' },
  { name: 'Ulcerative Colitis', type: 'Autoimmune Diseases' },
  { name: 'Sickle Cell Disease', type: 'Genetic Disorders' },
  { name: 'Cystic Fibrosis', type: 'Genetic Disorders' },
  { name: 'Duchenne Muscular Dystrophy', type: 'Genetic Disorders' },
  { name: 'Huntingtons Disease', type: 'Genetic Disorders' },
  { name: 'COVID-19 (Long COVID)', type: 'Infectious Diseases' },
  { name: 'Ebola Virus Disease', type: 'Infectious Diseases' },
  { name: 'Tuberculosis (TB)', type: 'Infectious Diseases' },
];

export async function seedDiseaseTypes() {
  try {
    await DiseaseType.insertMany(diseaseTypes);
    console.log('Disease types seeded successfully');
  } catch (error) {
    console.error('Error seeding disease types:', error);
  }
}
