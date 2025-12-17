import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  email: string;
  password: string;
  fullName: string;
  phone: string;
  role: 'citizen' | 'admin';
  createdAt: string;
}

export interface BirthRecord {
  id: string;
  applicationId: string;
  userId: string;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'corrections';
  certificateNo?: string;
  
  // Child Info
  childFirstName: string;
  childMiddleName?: string;
  childLastName: string;
  dateOfBirth: string;
  placeOfBirth: string;
  gender: 'male' | 'female' | 'other';
  
  // Parent Info
  fatherFirstName: string;
  fatherMiddleName?: string;
  fatherLastName: string;
  motherFirstName: string;
  motherMiddleName?: string;
  motherLastName: string;
  
  // Address
  district: string;
  municipality: string;
  wardNo: string;
  address: string;
  
  // Hospital Info
  hospitalName: string;
  
  // Documents
  documents: { name: string; type: string; uploadedAt: string }[];
  
  // Dates
  submittedAt?: string;
  reviewedAt?: string;
  approvedAt?: string;
  rejectedAt?: string;
  
  // Admin
  remarks?: string;
  reviewedBy?: string;
  
  createdAt: string;
  updatedAt: string;
}

export interface DeathRecord {
  id: string;
  applicationId: string;
  userId: string;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'corrections';
  certificateNo?: string;
  
  // Deceased Info
  deceasedFirstName: string;
  deceasedMiddleName?: string;
  deceasedLastName: string;
  dateOfDeath: string;
  placeOfDeath: string;
  gender: 'male' | 'female' | 'other';
  causeOfDeath: string;
  
  // Address
  district: string;
  municipality: string;
  wardNo: string;
  address: string;
  
  // Informant Info
  informantName: string;
  informantRelation: string;
  informantPhone: string;
  
  // Documents
  documents: { name: string; type: string; uploadedAt: string }[];
  
  // Dates
  submittedAt?: string;
  reviewedAt?: string;
  approvedAt?: string;
  rejectedAt?: string;
  
  // Admin
  remarks?: string;
  reviewedBy?: string;
  
  createdAt: string;
  updatedAt: string;
}

// Initial mock data
const initialUsers: User[] = [
  {
    id: 'admin-001',
    email: 'admin@gov.np',
    password: 'admin123',
    fullName: 'Ram Bahadur Thapa',
    phone: '9841234567',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'citizen-001',
    email: 'citizen@example.com',
    password: 'citizen123',
    fullName: 'Sita Sharma',
    phone: '9812345678',
    role: 'citizen',
    createdAt: '2024-01-15T00:00:00Z',
  },
];

const initialBirthRecords: BirthRecord[] = [
  {
    id: uuidv4(),
    applicationId: 'BR-2024-0001',
    userId: 'citizen-001',
    status: 'approved',
    certificateNo: 'BC-2024-001234',
    childFirstName: 'Aarav',
    childLastName: 'Sharma',
    dateOfBirth: '2024-01-10',
    placeOfBirth: 'Kathmandu',
    gender: 'male',
    fatherFirstName: 'Rajan',
    fatherLastName: 'Sharma',
    motherFirstName: 'Sita',
    motherLastName: 'Sharma',
    district: 'Kathmandu',
    municipality: 'Kathmandu Metropolitan City',
    wardNo: '10',
    address: 'Baneshwor',
    hospitalName: 'Teaching Hospital',
    documents: [
      { name: 'Hospital Discharge', type: 'pdf', uploadedAt: '2024-01-15' },
    ],
    submittedAt: '2024-01-15T10:00:00Z',
    reviewedAt: '2024-01-16T14:00:00Z',
    approvedAt: '2024-01-16T14:00:00Z',
    reviewedBy: 'admin-001',
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-16T14:00:00Z',
  },
  {
    id: uuidv4(),
    applicationId: 'BR-2024-0002',
    userId: 'citizen-001',
    status: 'under_review',
    childFirstName: 'Priya',
    childLastName: 'Sharma',
    dateOfBirth: '2024-02-05',
    placeOfBirth: 'Lalitpur',
    gender: 'female',
    fatherFirstName: 'Rajan',
    fatherLastName: 'Sharma',
    motherFirstName: 'Sita',
    motherLastName: 'Sharma',
    district: 'Lalitpur',
    municipality: 'Lalitpur Metropolitan City',
    wardNo: '5',
    address: 'Pulchowk',
    hospitalName: 'Patan Hospital',
    documents: [
      { name: 'Hospital Discharge', type: 'pdf', uploadedAt: '2024-02-10' },
    ],
    submittedAt: '2024-02-10T11:00:00Z',
    createdAt: '2024-02-10T10:00:00Z',
    updatedAt: '2024-02-10T11:00:00Z',
  },
];

const initialDeathRecords: DeathRecord[] = [
  {
    id: uuidv4(),
    applicationId: 'DR-2024-0001',
    userId: 'citizen-001',
    status: 'submitted',
    deceasedFirstName: 'Hari',
    deceasedLastName: 'Prasad',
    dateOfDeath: '2024-02-01',
    placeOfDeath: 'Kathmandu',
    gender: 'male',
    causeOfDeath: 'Natural causes',
    district: 'Kathmandu',
    municipality: 'Kathmandu Metropolitan City',
    wardNo: '15',
    address: 'Koteshwor',
    informantName: 'Krishna Prasad',
    informantRelation: 'Son',
    informantPhone: '9841111111',
    documents: [
      { name: 'Death Report', type: 'pdf', uploadedAt: '2024-02-05' },
    ],
    submittedAt: '2024-02-05T09:00:00Z',
    createdAt: '2024-02-05T08:00:00Z',
    updatedAt: '2024-02-05T09:00:00Z',
  },
];

// Local Storage Keys
const USERS_KEY = 'bdcs_users';
const BIRTH_RECORDS_KEY = 'bdcs_birth_records';
const DEATH_RECORDS_KEY = 'bdcs_death_records';
const CURRENT_USER_KEY = 'bdcs_current_user';

// Initialize data if not exists
export function initializeData() {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify(initialUsers));
  }
  if (!localStorage.getItem(BIRTH_RECORDS_KEY)) {
    localStorage.setItem(BIRTH_RECORDS_KEY, JSON.stringify(initialBirthRecords));
  }
  if (!localStorage.getItem(DEATH_RECORDS_KEY)) {
    localStorage.setItem(DEATH_RECORDS_KEY, JSON.stringify(initialDeathRecords));
  }
}

// User operations
export function getUsers(): User[] {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
}

export function getUserById(id: string): User | undefined {
  return getUsers().find(u => u.id === id);
}

export function getUserByEmail(email: string): User | undefined {
  return getUsers().find(u => u.email === email);
}

export function createUser(user: Omit<User, 'id' | 'createdAt'>): User {
  const users = getUsers();
  const newUser: User = {
    ...user,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return newUser;
}

export function getCurrentUser(): User | null {
  const data = localStorage.getItem(CURRENT_USER_KEY);
  return data ? JSON.parse(data) : null;
}

export function setCurrentUser(user: User | null) {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

// Birth Record operations
export function getBirthRecords(): BirthRecord[] {
  const data = localStorage.getItem(BIRTH_RECORDS_KEY);
  return data ? JSON.parse(data) : [];
}

export function getBirthRecordsByUser(userId: string): BirthRecord[] {
  return getBirthRecords().filter(r => r.userId === userId);
}

export function getBirthRecordById(id: string): BirthRecord | undefined {
  return getBirthRecords().find(r => r.id === id);
}

export function createBirthRecord(record: Omit<BirthRecord, 'id' | 'applicationId' | 'createdAt' | 'updatedAt'>): BirthRecord {
  const records = getBirthRecords();
  const count = records.length + 1;
  const newRecord: BirthRecord = {
    ...record,
    id: uuidv4(),
    applicationId: `BR-${new Date().getFullYear()}-${count.toString().padStart(4, '0')}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  records.push(newRecord);
  localStorage.setItem(BIRTH_RECORDS_KEY, JSON.stringify(records));
  return newRecord;
}

export function updateBirthRecord(id: string, updates: Partial<BirthRecord>): BirthRecord | undefined {
  const records = getBirthRecords();
  const index = records.findIndex(r => r.id === id);
  if (index === -1) return undefined;
  
  records[index] = {
    ...records[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(BIRTH_RECORDS_KEY, JSON.stringify(records));
  return records[index];
}

// Death Record operations
export function getDeathRecords(): DeathRecord[] {
  const data = localStorage.getItem(DEATH_RECORDS_KEY);
  return data ? JSON.parse(data) : [];
}

export function getDeathRecordsByUser(userId: string): DeathRecord[] {
  return getDeathRecords().filter(r => r.userId === userId);
}

export function getDeathRecordById(id: string): DeathRecord | undefined {
  return getDeathRecords().find(r => r.id === id);
}

export function createDeathRecord(record: Omit<DeathRecord, 'id' | 'applicationId' | 'createdAt' | 'updatedAt'>): DeathRecord {
  const records = getDeathRecords();
  const count = records.length + 1;
  const newRecord: DeathRecord = {
    ...record,
    id: uuidv4(),
    applicationId: `DR-${new Date().getFullYear()}-${count.toString().padStart(4, '0')}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  records.push(newRecord);
  localStorage.setItem(DEATH_RECORDS_KEY, JSON.stringify(records));
  return newRecord;
}

export function updateDeathRecord(id: string, updates: Partial<DeathRecord>): DeathRecord | undefined {
  const records = getDeathRecords();
  const index = records.findIndex(r => r.id === id);
  if (index === -1) return undefined;
  
  records[index] = {
    ...records[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(DEATH_RECORDS_KEY, JSON.stringify(records));
  return records[index];
}

// Generate certificate number
export function generateCertificateNo(type: 'birth' | 'death'): string {
  const prefix = type === 'birth' ? 'BC' : 'DC';
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 900000) + 100000;
  return `${prefix}-${year}-${random}`;
}
