// src/data/completedDoc.js

const completedDoc = {
  status: 'completed',
  summary: {
    english:
      'This is a comprehensive English summary of the uploaded document. It contains key insights, important information, and actionable recommendations extracted through advanced AI processing.',
    malayalam:
      'ഇത് അപ്‌ലോഡ് ചെയ്ത പ്രമാണത്തിന്റെ സമഗ്രമായ മലയാളം സംഗ്രഹമാണ്. AI പ്രോസസിംഗ് വഴി വേർതിരിച്ചെടുത്ത പ്രധാന ഉൾക്കാഴ്ചകളും പ്രധാന വിവരങ്ങളും പ്രവർത്തനാത്മക ശുപാർശകളും ഇതിൽ അടങ്ങിയിരിക്കുന്നു.'
  },
  tasks: [
    {
      id: 1,
      title: 'Document Review',
      role: 'ADMIN',
      status: 'pending',
      priority: 'high',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      description: {
        english:
          'Review the uploaded document for accuracy, completeness, and compliance with organizational standards. Verify that all required information is present and properly formatted.',
        malayalam:
          'അപ്‌ലോഡ് ചെയ്ത പ്രമാണം കൃത്യത, പൂർണ്ണത, സ്ഥാപന മാനദണ്ഡങ്ങളുമായുള്ള അനുയോജ്യത എന്നിവയ്ക്കായി അവലോകനം ചെയ്യുക. ആവശ്യമായ എല്ലാ വിവരങ്ങളും അവിടെയുണ്ടെന്നും ശരിയായ രീതിയിൽ ഫോർമാറ്റ് ചെയ്തിരിക്കുന്നുവെന്നും പരിശോധിക്കുക.'
      }
    },
    {
      id: 2,
      title: 'Translation Verification',
      role: 'MANAGER',
      status: 'pending',
      priority: 'medium',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      description: {
        english:
          'Verify the accuracy and quality of the Malayalam translation. Ensure that the translated content maintains the original meaning and context while being culturally appropriate.',
        malayalam:
          'മലയാളം വിവർത്തനത്തിന്റെ കൃത്യതയും ഗുണനിലവാരവും പരിശോധിക്കുക. വിവർത്തനം ചെയ്ത ഉള്ളടക്കം യഥാർത്ഥ അർത്ഥവും സന്ദർഭവും നിലനിർത്തുമ്പോൾ സാംസ്കാരികമായി അനുയോജ്യമാണെന്ന് ഉറപ്പാക്കുക.'
      }
    },
    {
      id: 3,
      title: 'Quality Assurance',
      role: 'ADMIN',
      status: 'pending',
      priority: 'high',
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      description: {
        english:
          'Conduct comprehensive quality assurance checks on the processed document. Verify data integrity, formatting consistency, and adherence to quality standards.',
        malayalam:
          'പ്രോസസ് ചെയ്ത പ്രമാണത്തിൽ സമഗ്ര ഗുണനിലവാര ഉറപ്പാക്കൽ പരിശോധനകൾ നടത്തുക. ഡാറ്റാ അഖണ്ഡത, ഫോർമാറ്റിംഗ് സ്ഥിരത, ഗുണനിലവാര മാനദണ്ഡങ്ങൾ പാലിക്കൽ എന്നിവ പരിശോധിക്കുക.'
      }
    },
    {
      id: 4,
      title: 'Content Analysis',
      role: 'ANALYST',
      status: 'pending',
      priority: 'low',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      description: {
        english:
          'Perform detailed content analysis to extract key insights, trends, and actionable recommendations. Identify patterns and provide strategic insights for decision-making.',
        malayalam:
          'പ്രധാന ഉൾക്കാഴ്ചകൾ, പ്രവണതകൾ, പ്രവർത്തനാത്മക ശുപാർശകൾ എന്നിവ വേർതിരിച്ചെടുക്കാൻ വിശദമായ ഉള്ളടക്ക വിശകലനം നടത്തുക. പാറ്റേണുകൾ തിരിച്ചറിയുകയും തീരുമാനമെടുക്കലിനായി തന്ത്രപരമായ ഉൾക്കാഴ്ചകൾ നൽകുകയും ചെയ്യുക.'
      }
    },
    {
      id: 5,
      title: 'Technical Review',
      role: 'TECHNICAL_LEAD',
      status: 'pending',
      priority: 'medium',
      dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
      description: {
        english:
          'Review the technical aspects of the document processing, including data extraction accuracy, AI model performance, and system integration points.',
        malayalam:
          'ഡാറ്റാ വേർതിരിച്ചെടുക്കലിന്റെ കൃത്യത, AI മോഡൽ പ്രകടനം, സിസ്റ്റം സംയോജന പോയിന്റുകൾ എന്നിവയുൾപ്പെടെ പ്രമാണ പ്രോസസിംഗിന്റെ സാങ്കേതിക വശങ്ങൾ അവലോകനം ചെയ്യുക.'
      }
    },
    {
      id: 6,
      title: 'Compliance Check',
      role: 'COMPLIANCE_OFFICER',
      status: 'pending',
      priority: 'high',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      description: {
        english:
          'Ensure the document and its processing comply with relevant regulations, policies, and legal requirements. Verify data privacy and security standards.',
        malayalam:
          'പ്രമാണവും അതിന്റെ പ്രോസസിംഗും ബന്ധപ്പെട്ട നിയമങ്ങൾ, നയങ്ങൾ, നിയമപരമായ ആവശ്യകതകൾ എന്നിവയുമായി അനുയോജ്യമാണെന്ന് ഉറപ്പാക്കുക. ഡാറ്റാ സ്വകാര്യതയും സുരക്ഷാ മാനദണ്ഡങ്ങളും പരിശോധിക്കുക.'
      }
    }
  ],
  completedAt: new Date().toISOString()
};

export { completedDoc };

[{
  "id": "1758636209728r74zb",
  "title": "ADBMS 4&5 - Engineer",
  "description": "Technical analysis needed for ADBMS 4&5.pdf. Focus on system design, architecture, and technical details.",
  "summary": "Technical analysis needed for ADBMS 4&5.pdf. Focus on system design, architecture, and technical details.",
  "summaryML": "ഇത് അപ്‌ലോഡ് ചെയ്ത പ്രമാണത്തിന്റെ സമഗ്രമായ മലയാളം സംഗ്രഹമാണ്. AI പ്രോസസിംഗ് വഴി വേർതിരിച്ചെടുത്ത പ്രധാന ഉൾക്കാഴ്ചകളും പ്രധാന വിവരങ്ങളും പ്രവർത്തനാത്മക ശുപാർശകളും ഇതിൽ അടങ്ങിയിരിക്കുന്നു.",
  "assignedTo": "1",
  "status": "completed",
  "fullText": "Technical analysis needed for ADBMS 4&5.pdf. Focus on system design, architecture, and technical details."
},
{ "id": "1758636209728bytom", 
  "title": "ADBMS 4&5 - Manager",
  "description": "Prepare report and overview for ADBMS 4&5.pdf. Include summary, important points, and managerial insights.",
  "summary": "Prepare report and overview for ADBMS 4&5.pdf. Include summary, important points, and managerial insights.",
  "summaryML": "ഇത് അപ്‌ലോഡ് ചെയ്ത പ്രമാണത്തിന്റെ സമഗ്രമായ മലയാളം സംഗ്രഹമാണ്. AI പ്രോസസിംഗ് വഴി വേർതിരിച്ചെടുത്ത പ്രധാന ഉൾക്കാഴ്ചകളും പ്രധാന വിവരങ്ങളും പ്രവർത്തനാത്മക ശുപാർശകളും ഇതിൽ അടങ്ങിയിരിക്കുന്നു.",
  "assignedTo": "2",
  "status": "pending",
  "fullText": "Prepare report and overview for ADBMS 4&5.pdf. Include summary, important points, and managerial insights."
},
{
  "id": "17586362097283b28x",
  "title": "ADBMS 4&5 - Depot Manager",
  "description": "Review logistics and resource allocation for ADBMS 4&5.pdf. Ensure proper distribution and inventory tracking.",
  "summary": "Review logistics and resource allocation for ADBMS 4&5.pdf. Ensure proper distribution and inventory tracking.",
  "summaryML": "ഇത് അപ്‌ലോഡ് ചെയ്ത പ്രമാണത്തിന്റെ സമഗ്രമായ മലയാളം സംഗ്രഹമാണ്. AI പ്രോസസിംഗ് വഴി വേർതിരിച്ചെടുത്ത പ്രധാന ഉൾക്കാഴ്ചകളും പ്രധാന വിവരങ്ങളും പ്രവർത്തനാത്മക ശുപാർശകളും ഇതിൽ അടങ്ങിയിരിക്കുന്നു.",
  "assignedTo": "3",
  "status": "pending",
  "fullText": "Review logistics and resource allocation for ADBMS 4&5.pdf. Ensure proper distribution and inventory tracking."
}]

[{"id":"1",
  "username":"user1",
  "role":"user",
  "name":"John Doe"
}]