const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const Project = require("../models/project.model");
const Assignment = require("../models/assignment.model");
const { initializeDatabase } = require("../db/db.connect");

// Add this at the beginning of seedDatabase function
const existingUsers = await User.countDocuments();
if (existingUsers > 0) {
  console.log("⚠️  Database already has data. Skipping seed...");
  console.log("   Use 'npm run seed:force' to reseed forcefully");
  process.exit(0);
}

const seedDatabase = async () => {
  try {
    console.log("🌱 Starting database seeding...");

    // Connect to database
    await initializeDatabase();

    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    await Assignment.deleteMany({});
    console.log("🗑️ Cleared existing data");

    // Create Users (1 Manager + 4 Engineers)
    const hashedPassword = await bcrypt.hash("password123", 10);

    const users = [
      // Manager
      {
        email: "manager@company.com",
        name: "Sarah Johnson",
        password: hashedPassword,
        role: "manager",
        department: "Engineering",
      },
      // Engineers
      {
        email: "john.doe@company.com",
        name: "John Doe",
        password: hashedPassword,
        role: "engineer",
        skills: ["React", "Node.js", "MongoDB", "TypeScript"],
        seniority: "senior",
        maxCapacity: 100, // Full-time
        department: "Frontend",
      },
      {
        email: "jane.smith@company.com",
        name: "Jane Smith",
        password: hashedPassword,
        role: "engineer",
        skills: ["Python", "Django", "PostgreSQL", "AWS"],
        seniority: "mid",
        maxCapacity: 100, // Full-time
        department: "Backend",
      },
      {
        email: "mike.wilson@company.com",
        name: "Mike Wilson",
        password: hashedPassword,
        role: "engineer",
        skills: ["React", "Vue.js", "CSS", "JavaScript"],
        seniority: "junior",
        maxCapacity: 50, // Part-time
        department: "Frontend",
      },
      {
        email: "lisa.brown@company.com",
        name: "Lisa Brown",
        password: hashedPassword,
        role: "engineer",
        skills: ["Node.js", "Express", "MongoDB", "Docker"],
        seniority: "senior",
        maxCapacity: 100, // Full-time
        department: "DevOps",
      },
    ];

    const createdUsers = await User.insertMany(users);
    console.log("👥 Created users:", createdUsers.length);

    // Get manager and engineers
    const manager = createdUsers.find((user) => user.role === "manager");
    const engineers = createdUsers.filter((user) => user.role === "engineer");

    // Create Projects
    const projects = [
      {
        name: "E-commerce Platform Redesign",
        description:
          "Complete redesign of the company's e-commerce platform with modern UI/UX",
        startDate: new Date("2024-01-15"),
        endDate: new Date("2024-06-15"),
        requiredSkills: ["React", "Node.js", "MongoDB", "TypeScript"],
        teamSize: 3,
        status: "active",
        managerId: manager._id,
      },
      {
        name: "Mobile App Development",
        description: "Native mobile app for iOS and Android platforms",
        startDate: new Date("2024-02-01"),
        endDate: new Date("2024-08-01"),
        requiredSkills: ["React Native", "JavaScript", "Firebase"],
        teamSize: 2,
        status: "planning",
        managerId: manager._id,
      },
      {
        name: "Data Analytics Dashboard",
        description: "Real-time analytics dashboard for business intelligence",
        startDate: new Date("2024-03-01"),
        endDate: new Date("2024-07-01"),
        requiredSkills: ["Python", "Django", "PostgreSQL", "D3.js"],
        teamSize: 2,
        status: "active",
        managerId: manager._id,
      },
      {
        name: "DevOps Infrastructure Setup",
        description: "Setting up CI/CD pipeline and cloud infrastructure",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-04-01"),
        requiredSkills: ["Docker", "AWS", "Jenkins", "Kubernetes"],
        teamSize: 1,
        status: "completed",
        managerId: manager._id,
      },
    ];

    const createdProjects = await Project.insertMany(projects);
    console.log("📋 Created projects:", createdProjects.length);

    // Create Assignments (8 assignments as per PDF requirement)
    const assignments = [
      // John Doe assignments (Senior - 100% capacity)
      {
        engineerId: engineers[0]._id, // John Doe
        projectId: createdProjects[0]._id, // E-commerce Platform
        allocationPercentage: 60,
        startDate: new Date("2024-01-15"),
        endDate: new Date("2024-06-15"),
        role: "Tech Lead",
      },
      {
        engineerId: engineers[0]._id, // John Doe
        projectId: createdProjects[2]._id, // Data Analytics Dashboard
        allocationPercentage: 40,
        startDate: new Date("2024-03-01"),
        endDate: new Date("2024-07-01"),
        role: "Senior Developer",
      },

      // Jane Smith assignments (Mid-level - 100% capacity)
      {
        engineerId: engineers[1]._id, // Jane Smith
        projectId: createdProjects[2]._id, // Data Analytics Dashboard
        allocationPercentage: 80,
        startDate: new Date("2024-03-01"),
        endDate: new Date("2024-07-01"),
        role: "Backend Developer",
      },
      {
        engineerId: engineers[1]._id, // Jane Smith
        projectId: createdProjects[3]._id, // DevOps Infrastructure
        allocationPercentage: 20,
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-04-01"),
        role: "Developer",
      },

      // Mike Wilson assignments (Junior - 50% capacity, part-time)
      {
        engineerId: engineers[2]._id, // Mike Wilson
        projectId: createdProjects[0]._id, // E-commerce Platform
        allocationPercentage: 30,
        startDate: new Date("2024-01-15"),
        endDate: new Date("2024-06-15"),
        role: "Frontend Developer",
      },
      {
        engineerId: engineers[2]._id, // Mike Wilson
        projectId: createdProjects[1]._id, // Mobile App Development
        allocationPercentage: 20,
        startDate: new Date("2024-02-01"),
        endDate: new Date("2024-08-01"),
        role: "UI Developer",
      },

      // Lisa Brown assignments (Senior - 100% capacity)
      {
        engineerId: engineers[3]._id, // Lisa Brown
        projectId: createdProjects[3]._id, // DevOps Infrastructure
        allocationPercentage: 70,
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-04-01"),
        role: "DevOps Engineer",
      },
      {
        engineerId: engineers[3]._id, // Lisa Brown
        projectId: createdProjects[0]._id, // E-commerce Platform
        allocationPercentage: 30,
        startDate: new Date("2024-01-15"),
        endDate: new Date("2024-06-15"),
        role: "DevOps Support",
      },
    ];

    const createdAssignments = await Assignment.insertMany(assignments);
    console.log("📝 Created assignments:", createdAssignments.length);

    // Summary
    console.log("\n🎉 Database seeded successfully!");
    console.log("📊 Summary:");
    console.log(
      `   • Users: ${createdUsers.length} (1 Manager, ${engineers.length} Engineers)`
    );
    console.log(`   • Projects: ${createdProjects.length}`);
    console.log(`   • Assignments: ${createdAssignments.length}`);
    console.log("\n👤 Login Credentials:");
    console.log("   Manager: manager@company.com / password123");
    console.log("   Engineers: john.doe@company.com / password123");
    console.log("              jane.smith@company.com / password123");
    console.log("              mike.wilson@company.com / password123");
    console.log("              lisa.brown@company.com / password123");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
