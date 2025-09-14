"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

export default function TrainingsPage() {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  const employees = [
    {
      id: 1,
      name: "Mocreac George",
      dateOfTest: "29/09/2025",
      scores: "97%",
      surveyResponses: [
        {
          question: "Cât de des schimbați parola pentru conturile de lucru?",
          answer: "Lunar",
          risk: "Scăzut",
          lawArticle: "Art. 15 - Măsuri de securitate",
          correct: true
        },
        {
          question: "Cum gestionați parola pentru conturile de lucru?",
          answer: "Folosesc un manager de parole",
          risk: "Scăzut",
          lawArticle: "Art. 15 - Măsuri de securitate",
          correct: true
        },
        {
          question: "Ce faceți când primiți un email suspect?",
          answer: "Raportez la echipa IT",
          risk: "Scăzut",
          lawArticle: "Art. 16 - Protecția împotriva atacurilor",
          correct: true
        },
        {
          question: "Cum vă conectați la rețeaua companiei?",
          answer: "Doar prin VPN-ul companiei",
          risk: "Scăzut",
          lawArticle: "Art. 17 - Securitatea rețelelor",
          correct: true
        },
        {
          question: "Ce informații partajați pe rețelele sociale despre munca voastră?",
          answer: "Nu partajez nimic despre muncă",
          risk: "Scăzut",
          lawArticle: "Art. 18 - Protecția datelor",
          correct: true
        },
        {
          question: "Cum gestionați dispozitivele de lucru?",
          answer: "Închid laptopul când plec de la birou, Activez blocarea automată a ecranului, Nu las dispozitivele neatendate, Folosesc doar software aprobat de IT, Actualizez regulat software-ul",
          risk: "Scăzut",
          lawArticle: "Art. 19 - Securitatea dispozitivelor",
          correct: true
        },
        {
          question: "Ce faceți când observați o activitate suspectă pe computer?",
          answer: "Raportez imediat la echipa IT",
          risk: "Scăzut",
          lawArticle: "Art. 20 - Monitorizarea și raportarea",
          correct: true
        },
        {
          question: "Cât de des faceți backup la datele importante?",
          answer: "Zilnic, automat",
          risk: "Scăzut",
          lawArticle: "Art. 21 - Backup și recuperarea datelor",
          correct: true
        },
        {
          question: "Cum gestionați accesul la fișierele sensibile?",
          answer: "Doar prin sistemele securizate ale companiei",
          risk: "Scăzut",
          lawArticle: "Art. 22 - Controlul accesului",
          correct: true
        },
        {
          question: "Cât de des participați la training-uri de securitate cibernetică?",
          answer: "La fiecare 3 luni",
          risk: "Scăzut",
          lawArticle: "Art. 23 - Formarea personalului",
          correct: true
        }
      ]
    },
    {
      id: 2,
      name: "Dorian Lesnic",
      dateOfTest: "28/09/2025",
      scores: "72%",
      surveyResponses: [
        {
          question: "Cât de des schimbați parola pentru conturile de lucru?",
          answer: "La fiecare 3 luni",
          risk: "Scăzut",
          lawArticle: "Art. 15 - Măsuri de securitate",
          correct: true
        },
        {
          question: "Cum gestionați parola pentru conturile de lucru?",
          answer: "Le memorez",
          risk: "Mediu",
          lawArticle: "Art. 15 - Măsuri de securitate",
          correct: false
        },
        {
          question: "Ce faceți când primiți un email suspect?",
          answer: "Verific linkurile înainte de a face click",
          risk: "Mediu",
          lawArticle: "Art. 16 - Protecția împotriva atacurilor",
          correct: false
        },
        {
          question: "Cum vă conectați la rețeaua companiei?",
          answer: "Prin WiFi securizat al companiei",
          risk: "Scăzut",
          lawArticle: "Art. 17 - Securitatea rețelelor",
          correct: true
        },
        {
          question: "Ce informații partajați pe rețelele sociale despre munca voastră?",
          answer: "Doar informații generale, fără detalii",
          risk: "Scăzut",
          lawArticle: "Art. 18 - Protecția datelor",
          correct: true
        },
        {
          question: "Cum gestionați dispozitivele de lucru?",
          answer: "Închid laptopul când plec de la birou, Activez blocarea automată a ecranului",
          risk: "Mediu",
          lawArticle: "Art. 19 - Securitatea dispozitivelor",
          correct: false
        },
        {
          question: "Ce faceți când observați o activitate suspectă pe computer?",
          answer: "Încerc să rezolv singur problema",
          risk: "Mediu",
          lawArticle: "Art. 20 - Monitorizarea și raportarea",
          correct: false
        },
        {
          question: "Cât de des faceți backup la datele importante?",
          answer: "Săptămânal",
          risk: "Scăzut",
          lawArticle: "Art. 21 - Backup și recuperarea datelor",
          correct: true
        },
        {
          question: "Cum gestionați accesul la fișierele sensibile?",
          answer: "Le trimit prin email când e necesar",
          risk: "Mediu",
          lawArticle: "Art. 22 - Controlul accesului",
          correct: false
        },
        {
          question: "Cât de des participați la training-uri de securitate cibernetică?",
          answer: "Anual",
          risk: "Scăzut",
          lawArticle: "Art. 23 - Formarea personalului",
          correct: true
        }
      ]
    },
    {
      id: 3,
      name: "Cristian Buza",
      dateOfTest: "27/09/2025",
      scores: "48%",
      surveyResponses: [
        {
          question: "Cât de des schimbați parola pentru conturile de lucru?",
          answer: "Anual sau mai rar",
          risk: "Înalt",
          lawArticle: "Art. 15 - Măsuri de securitate",
          correct: false
        },
        {
          question: "Cum gestionați parola pentru conturile de lucru?",
          answer: "Le notez pe hârtie sau în fișiere",
          risk: "Înalt",
          lawArticle: "Art. 15 - Măsuri de securitate",
          correct: false
        },
        {
          question: "Ce faceți când primiți un email suspect?",
          answer: "Fac click pe linkuri din curiozitate",
          risk: "Înalt",
          lawArticle: "Art. 16 - Protecția împotriva atacurilor",
          correct: false
        },
        {
          question: "Cum vă conectați la rețeaua companiei?",
          answer: "Prin WiFi public",
          risk: "Înalt",
          lawArticle: "Art. 17 - Securitatea rețelelor",
          correct: false
        },
        {
          question: "Ce informații partajați pe rețelele sociale despre munca voastră?",
          answer: "Informații despre clienți sau parteneri",
          risk: "Înalt",
          lawArticle: "Art. 18 - Protecția datelor",
          correct: false
        },
        {
          question: "Cum gestionați dispozitivele de lucru?",
          answer: "Nu știu ce înseamnă acestea",
          risk: "Critic",
          lawArticle: "Art. 19 - Securitatea dispozitivelor",
          correct: false
        },
        {
          question: "Ce faceți când observați o activitate suspectă pe computer?",
          answer: "Nu știu ce înseamnă activitate suspectă",
          risk: "Înalt",
          lawArticle: "Art. 20 - Monitorizarea și raportarea",
          correct: false
        },
        {
          question: "Cât de des faceți backup la datele importante?",
          answer: "Nu fac backup",
          risk: "Critic",
          lawArticle: "Art. 21 - Backup și recuperarea datelor",
          correct: false
        },
        {
          question: "Cum gestionați accesul la fișierele sensibile?",
          answer: "Le copiez pe USB-uri personale",
          risk: "Înalt",
          lawArticle: "Art. 22 - Controlul accesului",
          correct: false
        },
        {
          question: "Cât de des participați la training-uri de securitate cibernetică?",
          answer: "Nu știu că există astfel de training-uri",
          risk: "Critic",
          lawArticle: "Art. 23 - Formarea personalului",
          correct: false
        }
      ]
    },
    {
      id: 4,
      name: "Nicolae Cociorva",
      dateOfTest: "26/09/2025",
      scores: "95%",
      surveyResponses: [
        {
          question: "Cât de des schimbați parola pentru conturile de lucru?",
          answer: "Lunar",
          risk: "Scăzut",
          lawArticle: "Art. 15 - Măsuri de securitate",
          correct: true
        },
        {
          question: "Cum gestionați parola pentru conturile de lucru?",
          answer: "Folosesc un manager de parole",
          risk: "Scăzut",
          lawArticle: "Art. 15 - Măsuri de securitate",
          correct: true
        },
        {
          question: "Ce faceți când primiți un email suspect?",
          answer: "Șterg imediat emailul",
          risk: "Scăzut",
          lawArticle: "Art. 16 - Protecția împotriva atacurilor",
          correct: true
        },
        {
          question: "Cum vă conectați la rețeaua companiei?",
          answer: "Doar prin VPN-ul companiei",
          risk: "Scăzut",
          lawArticle: "Art. 17 - Securitatea rețelelor",
          correct: true
        },
        {
          question: "Ce informații partajați pe rețelele sociale despre munca voastră?",
          answer: "Nu partajez nimic despre muncă",
          risk: "Scăzut",
          lawArticle: "Art. 18 - Protecția datelor",
          correct: true
        },
        {
          question: "Cum gestionați dispozitivele de lucru?",
          answer: "Închid laptopul când plec de la birou, Activez blocarea automată a ecranului, Nu las dispozitivele neatendate, Folosesc doar software aprobat de IT, Actualizez regulat software-ul",
          risk: "Scăzut",
          lawArticle: "Art. 19 - Securitatea dispozitivelor",
          correct: true
        },
        {
          question: "Ce faceți când observați o activitate suspectă pe computer?",
          answer: "Raportez imediat la echipa IT",
          risk: "Scăzut",
          lawArticle: "Art. 20 - Monitorizarea și raportarea",
          correct: true
        },
        {
          question: "Cât de des faceți backup la datele importante?",
          answer: "Zilnic, automat",
          risk: "Scăzut",
          lawArticle: "Art. 21 - Backup și recuperarea datelor",
          correct: true
        },
        {
          question: "Cum gestionați accesul la fișierele sensibile?",
          answer: "Doar prin sistemele securizate ale companiei",
          risk: "Scăzut",
          lawArticle: "Art. 22 - Controlul accesului",
          correct: true
        },
        {
          question: "Cât de des participați la training-uri de securitate cibernetică?",
          answer: "La fiecare 3 luni",
          risk: "Scăzut",
          lawArticle: "Art. 23 - Formarea personalului",
          correct: true
        }
      ]
    },
    {
      id: 5,
      name: "Daniel Ioan",
      dateOfTest: "20/09/2025",
      scores: "53%",
      surveyResponses: [
        {
          question: "Cât de des schimbați parola pentru conturile de lucru?",
          answer: "La fiecare 6 luni",
          risk: "Mediu",
          lawArticle: "Art. 15 - Măsuri de securitate",
          correct: false
        },
        {
          question: "Cum gestionați parola pentru conturile de lucru?",
          answer: "Le notez într-un caiet securizat",
          risk: "Mediu",
          lawArticle: "Art. 15 - Măsuri de securitate",
          correct: false
        },
        {
          question: "Ce faceți când primiți un email suspect?",
          answer: "Răspund la email pentru a verifica",
          risk: "Critic",
          lawArticle: "Art. 16 - Protecția împotriva atacurilor",
          correct: false
        },
        {
          question: "Cum vă conectați la rețeaua companiei?",
          answer: "Prin hotspot mobil",
          risk: "Mediu",
          lawArticle: "Art. 17 - Securitatea rețelelor",
          correct: false
        },
        {
          question: "Ce informații partajați pe rețelele sociale despre munca voastră?",
          answer: "Detalii despre proiecte, dar fără date sensibile",
          risk: "Mediu",
          lawArticle: "Art. 18 - Protecția datelor",
          correct: false
        },
        {
          question: "Cum gestionați dispozitivele de lucru?",
          answer: "Închid laptopul când plec de la birou, Activez blocarea automată a ecranului",
          risk: "Mediu",
          lawArticle: "Art. 19 - Securitatea dispozitivelor",
          correct: false
        },
        {
          question: "Ce faceți când observați o activitate suspectă pe computer?",
          answer: "Închid computerul și îl pornesc din nou",
          risk: "Mediu",
          lawArticle: "Art. 20 - Monitorizarea și raportarea",
          correct: false
        },
        {
          question: "Cât de des faceți backup la datele importante?",
          answer: "Când îmi amintesc",
          risk: "Înalt",
          lawArticle: "Art. 21 - Backup și recuperarea datelor",
          correct: false
        },
        {
          question: "Cum gestionați accesul la fișierele sensibile?",
          answer: "Le salvez pe cloud personal",
          risk: "Înalt",
          lawArticle: "Art. 22 - Controlul accesului",
          correct: false
        },
        {
          question: "Cât de des participați la training-uri de securitate cibernetică?",
          answer: "Rar sau niciodată",
          risk: "Înalt",
          lawArticle: "Art. 23 - Formarea personalului",
          correct: false
        }
      ]
    },
  ];

  const handleInvite = () => {
    // Handle invite logic here
    console.log("Inviting:", email);
    setEmail("");
    setIsInviteModalOpen(false);
  };

  const handleViewDetails = (employee: any) => {
    setSelectedEmployee(employee);
    setIsDetailsModalOpen(true);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Critic":
        return "destructive";
      case "Înalt":
        return "destructive";
      case "Mediu":
        return "default";
      case "Scăzut":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getScoreColor = (score: string) => {
    const scoreValue = parseInt(score.replace('%', ''));
    if (scoreValue >= 90) {
      return "text-green-400"; // Excellent
    } else if (scoreValue >= 70) {
      return "text-yellow-400"; // Good
    } else if (scoreValue >= 50) {
      return "text-orange-400"; // Fair
    } else {
      return "text-red-400"; // Poor
    }
  };

  return (
    <div className="bg-zinc-900 min-h-screen w-[800px]">
      <main className="pt-[16px] pb-8">
        <Card className="bg-zinc-800 border-zinc-700 max-w-6xl mx-auto">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Employee Training</CardTitle>
                <p className="text-zinc-400 mt-1">Here you can invite employees to train.</p>
              </div>
              <Button
                onClick={() => setIsInviteModalOpen(true)}
                className="bg-white text-black hover:bg-gray-100 rounded-lg px-6 py-2 font-medium !mt-0"
              >
                Invite by Email
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-700 hover:bg-zinc-800/50">
                  <TableHead className="text-zinc-400 font-medium pl-6">Name</TableHead>
                  <TableHead className="text-zinc-400 font-medium">Date of Test</TableHead>
                  <TableHead className="text-zinc-400 font-medium">Scores</TableHead>
                  <TableHead className="text-zinc-400 font-medium pr-6 w-[125px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow 
                    key={employee.id}
                    className="border-zinc-700/50 hover:bg-zinc-800/30"
                  >
                    <TableCell className="text-white font-medium pl-6">
                      {employee.name}
                    </TableCell>
                    <TableCell className="text-zinc-300 ">
                      {employee.dateOfTest}
                    </TableCell>
                    <TableCell className={`font-semibold ${getScoreColor(employee.scores)}`}>
                      {employee.scores}
                    </TableCell>
                    <TableCell className="pr-6">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-zinc-700 border-zinc-600 text-white hover:bg-zinc-600 rounded-lg px-4 py-1 text-sm "
                        onClick={() => handleViewDetails(employee)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      {/* Invite Modal */}
      <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
        <DialogContent className="bg-zinc-800 border-zinc-700 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Invite Employee</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-zinc-300">
                Employee Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="employee@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-zinc-700 border-zinc-600 text-white placeholder-zinc-400 focus:border-white"
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsInviteModalOpen(false)}
                className="border-zinc-600 text-zinc-300 hover:bg-zinc-700"
              >
                Cancel
              </Button>
              <Button
                onClick={handleInvite}
                className="bg-white text-black hover:bg-gray-100"
              >
                Send Invite
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Employee Details Modal */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="bg-zinc-800 border-zinc-700 max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">
              {selectedEmployee?.name} - Survey Details
            </DialogTitle>
            <div className="flex items-center gap-4 text-sm text-zinc-400">
              <span>Test Date: {selectedEmployee?.dateOfTest}</span>
              <span>Score: {selectedEmployee?.scores}</span>
            </div>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-2">
              {selectedEmployee?.surveyResponses?.map((response: any, index: number) => (
                <Card key={index} className="bg-zinc-700 border-zinc-600 rounded-lg">
                  <CardContent className="p-3">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="text-white font-medium text-xs">
                          Q{index + 1}
                        </h4>
                        <div className="flex items-center gap-2">
                          {response.correct ? (
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          ) : (
                            <XCircle className="h-3 w-3 text-red-500" />
                          )}
                          <Badge variant={getRiskColor(response.risk)} className="text-xs px-2 py-0">
                            {response.risk}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-zinc-200 text-xs font-medium leading-tight">
                        {response.question}
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-zinc-400">Answer:</span>
                          <p className="text-zinc-300 truncate">{response.answer}</p>
                        </div>
                        <div>
                          <span className="text-zinc-400">Article:</span>
                          <p className="text-zinc-300">{response.lawArticle}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button
              onClick={() => setIsDetailsModalOpen(false)}
              className="bg-white text-black hover:bg-gray-100"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
