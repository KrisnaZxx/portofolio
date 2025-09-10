#include <iostream>
using namespace std;

int main() {
    float assignmentGrade, midtermGrade, finalExamGrade;
    
    cout << "Enter your assignment grade (out of 100): ";
    cin >> assignmentGrade;
    cout << "Enter your midterm grade (out of 100): ";
    cin >> midtermGrade;
    cout << "Enter your final exam grade (out of 100): ";
    cin >> finalExamGrade;
    
    float finalGrade = (assignmentGrade * 0.3) + (midtermGrade * 0.3) + (finalExamGrade * 0.4);
    
    cout << "Your final grade is: " << finalGrade << endl;

    return 0;
}