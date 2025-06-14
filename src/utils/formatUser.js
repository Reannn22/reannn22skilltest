const formatUserResponse = (user) => ({
  name: {
    first: user.name.first,
    last: user.name.last,
    fullName: `${user.name.first} ${user.name.last}`
  },
  email: user.email,
  phoneNumber: user.phoneNumber,
  department: user.department,
  position: user.position,
  employeeId: user.employeeId,
  isActive: user.isActive,
  joiningDate: user.joiningDate,
  address: user.address,
  emergencyContact: user.emergencyContact,
  skills: user.skills,
  education: user.education.map(({ degree, institution, year }) => ({
    degree,
    institution,
    year
  })),
  socialMedia: user.socialMedia,
  notes: user.notes,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt
});

module.exports = formatUserResponse;
