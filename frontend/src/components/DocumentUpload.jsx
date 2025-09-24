import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // For unique IDs

const users = [
  { id: '1', role: 'engineer', name: 'Engineer' },
  { id: '2', role: 'manager', name: 'Manager' },
  { id: '3', role: 'depot', name: 'Depot Manager' },
];

const DocumentUpload = ({ onTaskCreate }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setTitle(selectedFile.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const simulateTextExtraction = async (file) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const sampleTexts = [
        {
          en: "Oversee budget allocation, compliance improvement, and ensure weekly safety drills and monitoring systems are implemented.",
          ml: "ബജറ്റ് വിനിയോഗം മേൽനോട്ടം വഹിക്കുക, അനുസരണ മെച്ചപ്പെടുത്തൽ ഉറപ്പാക്കുക, സാപ്താഹിക സുരക്ഷാ പരിശീലനങ്ങളും നിരീക്ഷണ സംവിധാനങ്ങളും നടപ്പാക്കുക."
        },
        {
          en: "Handle technical repairs—track replacement, electrical panel upgrade, signaling overhaul, emergency systems, and passenger equipment servicing.",
          ml: "സാങ്കേതിക അറ്റകുറ്റപ്പണികൾ കൈകാര്യം ചെയ്യുക — ട്രാക്ക് മാറ്റിസ്ഥാപിക്കൽ, ഇലക്ട്രിക്കൽ പാനൽ അപ്‌ഗ്രേഡ്, സിഗ്നൽ സിസ്റ്റം നവീകരണം, അടിയന്തര സംവിധാനങ്ങൾ, യാത്രക്കാരുടെ ഉപകരണങ്ങൾ എന്നിവയുടെ സർവീസിംഗ്."
        },
        {
          en: "Coordinate on-ground execution—close/open tracks, clear emergency exits, schedule escalator/equipment maintenance, and deploy temporary/manual systems.",
          ml: "തറതട്ടിലെ പ്രവർത്തനങ്ങൾ ഏകോപിപ്പിക്കുക — ട്രാക്കുകൾ അടയ്ക്കൽ/തുറക്കൽ, അടിയന്തര പുറത്ത് പോകാനുള്ള വഴികൾ വൃത്തിയാക്കൽ, എസ്കലേറ്റർ/ഉപകരണങ്ങളുടെ പരിപാലന ഷെഡ്യൂൾ, താൽക്കാലിക/മാനുവൽ സംവിധാനങ്ങൾ വിന്യസിക്കൽ."
        },
        {
          en: "Plan predictive maintenance rollout with IoT sensors and approve long-term maintenance schedules.",
          ml: "IoT സെൻസറുകളിലൂടെ പ്രവചനപരമായ പരിപാലന പദ്ധതി രൂപപ്പെടുത്തുക, ദീർഘകാല പരിപാലന ഷെഡ്യൂളുകൾ അംഗീകരിക്കുക."
        },
        {
          en: "Recalibrate Automatic Train Protection system and fix platform edge doors.",
          ml: "ഓട്ടോമാറ്റിക് ട്രെയിൻ പ്രൊട്ടക്ഷൻ സിസ്റ്റം പുനഃക്രമീകരിക്കുക, പ്ലാറ്റ്ഫോം എഡ്ജ് ഡോറുകളുടെ പ്രശ്നങ്ങൾ പരിഹരിക്കുക."
        },
        {
          en: "Ensure ballast replacement, drainage clearance, and coordinate staff for temporary emergency lighting installation.",
          ml: "ബാലസ്റ്റ് മാറ്റിസ്ഥാപിക്കൽ, ഡ്രെയിനേജ് വൃത്തിയാക്കൽ, താൽക്കാലിക അടിയന്തര ലൈറ്റിംഗ് ഇൻസ്റ്റാൾ ചെയ്യുന്നതിനുള്ള ജീവനക്കാരെ ഏകോപിപ്പിക്കുക."
        }
      ];
      const randomTask = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
      resolve(randomTask);
    }, 1500);
  });
};


  const generateSummary = (text) => {
    const words = text.split(' ');
    return words.slice(0, 50).join(' ') + (words.length > 50 ? '...' : '');
  };

  const translateToMalayalam = (text) => {
    if (text['1']) {
      return "ബജറ്റ് വിനിയോഗം മേൽനോട്ടം വഹിക്കുക, അനുസരണ മെച്ചപ്പെടുത്തൽ ഉറപ്പാക്കുക, സാപ്താഹിക സുരക്ഷാ പരിശീലനങ്ങളും നിരീക്ഷണ സംവിധാനങ്ങളും നടപ്പാക്കുക.";
    }
    if (text['2']) {
      return "സാങ്കേതിക അറ്റകുറ്റപ്പണികൾ കൈകാര്യം ചെയ്യുക — ട്രാക്ക് മാറ്റിസ്ഥാപിക്കൽ, ഇലക്ട്രിക്കൽ പാനൽ അപ്‌ഗ്രേഡ്, സിഗ്നൽ സിസ്റ്റം നവീകരണം, അടിയന്തര സംവിധാനങ്ങൾ, യാത്രക്കാരുടെ ഉപകരണങ്ങൾ എന്നിവയുടെ സർവീസിംഗ്.";
    }
    if (text['3']) {
      return "തറതട്ടിലെ പ്രവർത്തനങ്ങൾ ഏകോപിപ്പിക്കുക — ട്രാക്കുകൾ അടയ്ക്കൽ/തുറക്കൽ, അടിയന്തര പുറത്ത് പോകാനുള്ള വഴികൾ വൃത്തിയാക്കൽ, എസ്കലേറ്റർ/ഉപകരണങ്ങളുടെ പരിപാലന ഷെഡ്യൂൾ, താൽക്കാലിക/മാനുവൽ സംവിധാനങ്ങൾ വിന്യസിക്കൽ.";
    }
    if (text['4']) {
      return "IoT സെൻസറുകളിലൂടെ പ്രവചനപരമായ പരിപാലന പദ്ധതി രൂപപ്പെടുത്തുക, ദീർഘകാല പരിപാലന ഷെഡ്യൂളുകൾ അംഗീകരിക്കുക."
    }
    if (text['5']) {
      return "ഓട്ടോമാറ്റിക് ട്രെയിൻ പ്രൊട്ടക്ഷൻ സിസ്റ്റം പുനഃക്രമീകരിക്കുക, പ്ലാറ്റ്ഫോം എഡ്ജ് ഡോറുകളുടെ പ്രശ്നങ്ങൾ പരിഹരിക്കുക.";
    }
    if (text['6']) {
      return "ബാലസ്റ്റ് മാറ്റിസ്ഥാപിക്കൽ, ഡ്രെയിനേജ് വൃത്തിയാക്കൽ, താൽക്കാലിക അടിയന്തര ലൈറ്റിംഗ് ഇൻസ്റ്റാൾ ചെയ്യുന്നതിനുള്ള ജീവനക്കാരെ ഏകോപിപ്പിക്കുക.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title) return;

    setIsProcessing(true);

    try {

      const extractedText = await simulateTextExtraction(file);
      const newTasks = users.map(user => {
        // Customize extracted text per user role
        let userText = '';
        switch (user.role) {
          case 'engineer':
            userText = `Technical analysis needed for ${file.name}. Focus on system design, architecture, and technical details.`;
            break;
          case 'manager':
            userText = `Prepare report and overview for ${file.name}. Include summary, important points, and managerial insights.`;
            break;
          case 'depot':
            userText = `Review logistics and resource allocation for ${file.name}. Ensure proper distribution and inventory tracking.`;
            break;
          default:
            userText = `Process task for ${file.name}`;
        }


        // generate a summary from this extracted text
        const summary = generateSummary(extractedText);

        return {
          id: uuidv4(),
          title: `${title} - ${user.name}`,
          description: userText,
          summary,
          summaryML: translateToMalayalam(summary),
          assignedTo: user.id,
          status: 'pending',
          fullText: userText, // full text also role-specific
        };
      });

      onTaskCreate(newTasks);
      setFile(null);
      setTitle('');
    } catch (error) {
      console.error('Error processing document:', error);
    } finally {
      setIsProcessing(false);
    }
  };


  return (
    <div className="rounded-xl px-4 py-4 max-w-lg mx-auto hover:shadow-2xl transition-shadow duration-300">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-[#00303F] font-medium mb-2">Document File</label>
          <input
            type="file"
            accept=".txt,.pdf,.doc,.docx,.png,.jpg,.jpeg"
            onChange={handleFileChange}
            className="w-full px-4 py-3 border-2 border-[#CDAC81] rounded-lg bg-[#CAE4DB] text-[#00303F] focus:outline-none focus:ring-2 focus:ring-[#00303F] hover:border-[#00303F] transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-[#00303F] font-medium mb-2">Task Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            className="w-full px-4 py-3 border-2 border-[#CDAC81] rounded-lg bg-[#CAE4DB] text-[#00303F] focus:outline-none focus:ring-2 focus:ring-[#00303F] hover:border-[#00303F] transition-colors"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isProcessing}
          className={`w-full py-3 rounded-lg text-[#F5F4F4] font-semibold transition-all duration-300 
            ${isProcessing ? 'bg-[#00303F] opacity-60 cursor-not-allowed' : 'bg-[#00303F] hover:bg-[#CDAC81] hover:text-[#00303F]'}
          `}
        >
          {isProcessing ? 'Processing...' : 'Process Document'}
        </button>
      </form>
    </div>
  );
};

export default DocumentUpload;
