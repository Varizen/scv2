#!/bin/bash

echo "🧪 Testing Labor Migration Platform API - Complete Demo"
echo "=================================================="

# Base URL
BASE_URL="http://localhost:3001"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Function to test an endpoint
test_endpoint() {
    local method=$1
    local endpoint=$2
    local description=$3
    local auth_header=$4
    
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    
    echo -e "\n${YELLOW}Testing: $description${NC}"
    echo "Method: $method $endpoint"
    
    if [ "$auth_header" != "" ]; then
        response=$(curl -s -X "$method" "$BASE_URL$endpoint" -H "$auth_header")
    else
        response=$(curl -s -X "$method" "$BASE_URL$endpoint")
    fi
    
    # Check if response contains success or error
    if echo "$response" | grep -q '"success":true'; then
        echo -e "${GREEN}✅ PASSED${NC}"
        PASSED_TESTS=$((PASSED_TESTS + 1))
    elif echo "$response" | grep -q '"error"'; then
        echo -e "${RED}❌ FAILED${NC}"
        echo "Response: $response"
        FAILED_TESTS=$((FAILED_TESTS + 1))
    else
        echo -e "${RED}❌ FAILED - No valid response${NC}"
        echo "Response: $response"
        FAILED_TESTS=$((FAILED_TESTS + 1))
    fi
}

echo "Starting comprehensive API tests..."

# Health Check
test_endpoint "GET" "/api/health" "Health Check"

# Authentication Endpoints
test_endpoint "POST" "/api/auth/register" "User Registration" ""
test_endpoint "POST" "/api/auth/login" "User Login" ""
test_endpoint "POST" "/api/auth/verify-email" "Email Verification" ""
test_endpoint "POST" "/api/auth/forgot-password" "Forgot Password" ""
test_endpoint "POST" "/api/auth/reset-password" "Reset Password" ""

# User Management
test_endpoint "GET" "/api/users" "Get Users List" ""
test_endpoint "GET" "/api/users/1" "Get User by ID" ""
test_endpoint "PUT" "/api/users/1" "Update User" ""
test_endpoint "DELETE" "/api/users/1" "Delete User" ""

# Worker Profile
test_endpoint "GET" "/api/workers/profile" "Get Worker Profile" ""
test_endpoint "POST" "/api/workers/profile" "Create Worker Profile" ""

# Employer Profile
test_endpoint "GET" "/api/employers/profile" "Get Employer Profile" ""
test_endpoint "POST" "/api/employers/profile" "Create Employer Profile" ""

# Job Management
test_endpoint "GET" "/api/jobs" "Get Jobs List" ""
test_endpoint "POST" "/api/jobs" "Create Job Posting" ""
test_endpoint "GET" "/api/jobs/1" "Get Job by ID" ""
test_endpoint "PUT" "/api/jobs/1" "Update Job" ""
test_endpoint "DELETE" "/api/jobs/1" "Delete Job" ""

# Applications
test_endpoint "GET" "/api/applications" "Get Applications" ""
test_endpoint "POST" "/api/applications" "Submit Application" ""

# Documents
test_endpoint "GET" "/api/documents" "Get Documents" ""
test_endpoint "POST" "/api/documents" "Upload Document" ""

# Payments
test_endpoint "GET" "/api/payments" "Get Payments" ""
test_endpoint "POST" "/api/payments" "Create Payment" ""

# Visa Applications
test_endpoint "GET" "/api/visa/applications" "Get Visa Applications" ""
test_endpoint "POST" "/api/visa/applications" "Submit Visa Application" ""

# Downloads Section (NEW!)
echo -e "\n${YELLOW}📥 Testing Downloads Section${NC}"
test_endpoint "GET" "/api/downloads/categories" "Download Categories"
test_endpoint "GET" "/api/downloads/items/employment-agreement" "Download Item Details"
test_endpoint "GET" "/api/downloads/required-documents" "Required Documents"
test_endpoint "GET" "/api/downloads/document-checklist?stage=registration" "Document Checklist"
test_endpoint "GET" "/api/downloads/download/employment-agreement" "File Download"

# Summary
echo -e "\n=================================================="
echo -e "${YELLOW}Test Summary:${NC}"
echo -e "Total Tests: $TOTAL_TESTS"
echo -e "${GREEN}Passed: $PASSED_TESTS${NC}"
echo -e "${RED}Failed: $FAILED_TESTS${NC}"
echo -e "Success Rate: $(( (PASSED_TESTS * 100) / TOTAL_TESTS ))%"
echo "=================================================="

if [ $FAILED_TESTS -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed! The API is working correctly.${NC}"
    exit 0
else
    echo -e "${RED}❌ Some tests failed. Please check the implementation.${NC}"
    exit 1
fi