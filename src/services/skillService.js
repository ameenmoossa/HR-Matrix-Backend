const fs = require('fs/promises');
const pdf = require('pdf-parse');
const catalog = require('../utils/skillCatalog');

const normalize = (value = '') => value.toLowerCase().trim();

const extractSkillsFromPdf = async (filePath) => {
  try {
    const dataBuffer = await fs.readFile(filePath);
    const pdfData = await pdf(dataBuffer);
    const text = normalize(pdfData.text);
    const detected = catalog.filter((skill) => text.includes(skill));
    return [...new Set(detected)];
  } catch (error) {
    console.error('PDF parsing failed:', error.message);
    return [];
  }
};

const matchSkills = (candidateSkills = [], requiredSkills = []) => {
  const normalizedCandidate = candidateSkills.map(normalize);
  const normalizedRequired = requiredSkills.map(normalize);
  const matched = normalizedRequired.filter((skill) =>
    normalizedCandidate.includes(skill)
  );
  const coverage =
    normalizedRequired.length === 0
      ? 0
      : Math.round((matched.length / normalizedRequired.length) * 100);

  let matchLevel = 'Low Match';
  if (coverage >= 80) {
    matchLevel = 'Strong Match';
  } else if (coverage >= 40) {
    matchLevel = 'Partial Match';
  }

  return {
    matchLevel,
    coverage,
    matchedSkills: matched,
  };
};

module.exports = { extractSkillsFromPdf, matchSkills };

