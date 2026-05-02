import { Injectable, signal } from '@angular/core';
import { NewsItem } from '../models/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  // Using signals for reactive state management
  private readonly _news = signal<NewsItem[]>([
    {
      id: 1,
      title: 'Benha University Participates in a Cybersecurity Workshop in China',
      excerpt: `Dr. Nasser El-Gizawy, President of Benha University, announced the university’s participation in a cybersecurity workshop in China, taking place from April 14 to 27, 2026. The workshop brings together a distinguished group of experts and specialists from 36 countries worldwide. The university is represented by Dr. Sara Sweidan, Assistant Professor at the Faculty of Computers and Artificial Intelligence.
Dr. El-Gizawy stated that this participation comes within the framework of the Belt and Road Initiative (Silk Road) and aligns with the university’s commitment to supporting academic excellence and openness to international expertise. Through such engagements, the university continues to strengthen its global presence, contributing to the development of its academic and research capabilities, and reinforcing its position both regionally and internationally. The workshop is held with the participation of high-level official delegations and under the patronage of the Chinese Ministry of Commerce and the Academy for International Business Officials (AIBO).
He further emphasized the university’s dedication to staying informed about the latest global experiences and building qualified academic cadres capable of keeping pace with rapid developments in modern technology fields, particularly cybersecurity and digital infrastructure.
The program covered several vital topics, including modern digital infrastructure technologies and their applications, cybersecurity frameworks for cross-border systems, risk management in digital transformation projects, digital governance policies, building secure digital environments, and ways to enhance international cooperation in cybersecurity.
The workshop also aims to develop technical and administrative capabilities in securing digital infrastructure, promote best practices in cybersecurity risk management, encourage the exchange of expertise among professionals and decision-makers, and support international collaboration to achieve safe and sustainable digital development, while fostering innovation and ensuring trust and security in digital networks.
`,
      imageUrl: 'assets/images/news/WhatsApp Image 2026-05-01 at 6.06.19 PM.jpeg',
      category: 'International',
      slug: 'cybersecurity-workshop-china'
    },
    {
      id: 2,
      title: 'Benha University Announces Senior-Level Supervisory Job Vacancies for University and Faculty Staff',
      excerpt: 'Open positions for first-level supervisory roles for internal staff across the university...',
      imageUrl: 'assets/images/news/Gemini_Generated_Image_oz49i9oz49i9oz49.jpeg',
      category: 'Careers',
      slug: 'supervisory-job-opportunities'
    },
    {
      id: 3,
      title: 'Strengthening Cultural and Scientific Cooperation: Benha University President Receives the Japanese Ambassador to Cairo',
      excerpt: 'The university president met with the Japanese ambassador to discuss future academic collaboration...',
      imageUrl: 'assets/images/news/WhatsApp Image 2026-05-01 at 5.45.53 PM.jpeg',
      category: 'Collaboration',
      slug: 'cultural-scientific-cooperation'
    },
    {
      id: 4,
      title: 'Call for Nominations for the Egypt Government Excellence Award 2026',
      excerpt: 'Open positions for first-level supervisory roles for internal staff across the university...',
      imageUrl: 'assets/images/news/WhatsApp Image 2026-04-30 at 11.46.33 PM.jpeg',
      category: 'Careers',
      slug: 'egypt-government-excellence-award-2026'
    },
    {
      id: 5,
      title: 'Within the Framework of the “100 Million Trees” Initiative: Benha University President Inspects the 3rd Annual Flower Exhibition',
      excerpt: 'The university president met with the Japanese ambassador to discuss future academic collaboration...',
      imageUrl: 'assets/images/news/WhatsApp Image 2026-05-01 at 12.07.53 AM.jpeg',
      category: 'Collaboration',
      slug: 'culturadl-scientifsic-cooperdation'
    },
    {
      id: 6,
      title: 'Benha University Announces Vacancy for Head of Education and Student Affairs Department  Faculty of Medicine',
      excerpt: 'The university president met with the Japanese ambassador to discuss future academic collaboration...',
      imageUrl: 'assets/images/news/Gemini_Generated_Image_oz49i9oz49i9oz49.jpeg',
      category: 'Collaboration',
      slug: 'cultural-sciefntific-cooperation'
    }
  ]);

  readonly news = this._news.asReadonly();

  getNewsById(id: number): NewsItem | undefined {
    return this._news().find(item => item.id === id);
  }

  getNewsBySlug(slug: string): NewsItem | undefined {
    return this._news().find(item => item.slug === slug);
  }
}
