"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = seedDatabase;
const pg_1 = require("pg");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = require("../config/config");
const pool = new pg_1.Pool({
    host: config_1.config.database.host,
    port: config_1.config.database.port,
    database: config_1.config.database.name,
    user: config_1.config.database.user,
    password: config_1.config.database.password,
});
async function seedDatabase() {
    try {
        console.log('🌱 Starting database seeding...');
        const adminPassword = await bcryptjs_1.default.hash('admin123', 10);
        const adminUser = await pool.query(`
      INSERT INTO users (email, password, first_name, last_name, user_type, email_verified)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (email) DO NOTHING
      RETURNING id
    `, ['admin@skillconnect.com', adminPassword, 'Admin', 'User', 'admin', true]);
        if (adminUser.rows.length > 0) {
            console.log('✅ Admin user created');
        }
        else {
            console.log('ℹ️ Admin user already exists');
        }
        const employerPassword = await bcryptjs_1.default.hash('employer123', 10);
        const employerUser = await pool.query(`
      INSERT INTO users (email, password, first_name, last_name, user_type, email_verified)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (email) DO NOTHING
      RETURNING id
    `, ['employer@example.com', employerPassword, 'John', 'Doe', 'employer', true]);
        if (employerUser.rows.length > 0) {
            const employerUserId = employerUser.rows[0].id;
            await pool.query(`
        INSERT INTO employers (
          user_id, company_name, company_registration_number, company_type, 
          industry, company_size, website, phone, address, city, country,
          contact_person_name, contact_person_title, contact_person_phone,
          verification_status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      `, [
                employerUserId,
                'Italian Construction Co. Ltd.',
                'IT123456789',
                'private',
                'Construction',
                'large',
                'https://italianconstruction.example.com',
                '+39-02-1234567',
                'Via Roma 123, Milano',
                'Milano',
                'Italy',
                'Mario Rossi',
                'HR Manager',
                '+39-333-1234567',
                'verified'
            ]);
            console.log('✅ Sample employer created');
        }
        else {
            console.log('ℹ️ Employer user already exists');
        }
        const workerPassword = await bcryptjs_1.default.hash('worker123', 10);
        const workerUser = await pool.query(`
      INSERT INTO users (email, password, first_name, last_name, user_type, email_verified)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (email) DO NOTHING
      RETURNING id
    `, ['worker@example.com', workerPassword, 'Mohammad', 'Rahman', 'worker', true]);
        if (workerUser.rows.length > 0) {
            const workerUserId = workerUser.rows[0].id;
            await pool.query(`
        INSERT INTO workers (
          user_id, passport_number, nationality, date_of_birth, gender, 
          phone, address, city, country, emergency_contact_name, 
          emergency_contact_phone, emergency_contact_relationship,
          current_location, target_country, education_level, years_of_experience,
          current_employer, current_job_title, current_salary, skills, languages,
          profile_status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)
      `, [
                workerUserId,
                'BG123456789',
                'Bangladeshi',
                '1990-01-15',
                'male',
                '+60-12-3456789',
                '123 Jalan Ampang, Kuala Lumpur',
                'Kuala Lumpur',
                'Malaysia',
                'Abdul Rahman',
                '+880-1712345678',
                'Father',
                'Malaysia',
                'Italy',
                'High School',
                5,
                'Malaysian Construction Ltd.',
                'Construction Worker',
                2500.00,
                ['Construction', 'Carpentry', 'Masonry'],
                ['Bengali', 'English', 'Malay'],
                'approved'
            ]);
            console.log('✅ Sample worker created');
        }
        else {
            console.log('ℹ️ Worker user already exists');
        }
        const jobResult = await pool.query(`
      INSERT INTO jobs (
        employer_id, title, description, requirements, responsibilities,
        job_type, contract_duration_months, salary_min, salary_max,
        salary_currency, location, country, region, industry, category,
        skills_required, languages_required, education_level_required,
        experience_years_min, experience_years_max, age_min, age_max,
        gender_preference, accommodation_provided, food_provided,
        transportation_provided, medical_insurance, visa_sponsorship,
        relocation_assistance, positions_available, status
      ) VALUES (
        (SELECT id FROM employers WHERE company_name = 'Italian Construction Co. Ltd.' LIMIT 1),
        'Construction Worker - Italy',
        'We are looking for experienced construction workers to join our team in Milan, Italy. This is an excellent opportunity for Bangladeshi workers currently in Malaysia to transition to Italy.',
        ARRAY['High School Diploma', 'Construction Experience', 'Physical Fitness', 'Safety Training'],
        ARRAY['Building construction', 'Concrete work', 'Steel fixing', 'Site preparation', 'Safety compliance'],
        'full_time', 24, 1200, 1800, 'EUR', 'Milan', 'Italy', 'Lombardy', 'Construction', 'Skilled Labor',
        ARRAY['Construction', 'Concrete', 'Masonry', 'Steel Work'], ARRAY['English', 'Italian'], 'High School',
        2, 10, 22, 45, 'any', true, true, true, true, true, true, 5, 'active'
      )
      RETURNING id
    `);
        if (jobResult.rows.length > 0) {
            console.log('✅ Sample job created');
        }
        else {
            console.log('ℹ️ Sample job already exists or employer not found');
        }
        console.log('🎉 Database seeding completed successfully!');
        console.log('\n📋 Sample Login Credentials:');
        console.log('Admin: admin@skillconnect.com / admin123');
        console.log('Employer: employer@example.com / employer123');
        console.log('Worker: worker@example.com / worker123');
    }
    catch (error) {
        console.error('💥 Seeding failed:', error);
        throw error;
    }
    finally {
        await pool.end();
    }
}
if (require.main === module) {
    seedDatabase();
}
//# sourceMappingURL=seed.js.map