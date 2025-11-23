import { Schema } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import { DocumentStatusType } from '@taiger-common/core';

import { PROGRAM_SUBJECT_KEYS } from './Program';
const ManagerType = {
  Agent: 'Agent',
  Editor: 'Editor',
  AgentAndEditor: 'AgentAndEditor',
  None: 'None'
};
const options = { discriminatorKey: 'role', timestamps: true };

const attributeSchema = new Schema({
  value: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      trim: true
    },
    firstname_chinese: {
      type: String,
      trim: true
    },
    lastname: {
      type: String,
      trim: true
    },
    lastname_chinese: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      validate: [isEmail, 'Invalid email address']
    },
    pictureUrl: {
      type: String
    },
    password: {
      type: String,
      select: false,
      trim: true,
      minlength: [8, 'Password must contain at least 8 characters']
    },
    archiv: { type: Boolean, default: false },
    birthday: {
      type: String,
      default: ''
    },
    linkedIn: String,
    lineId: String,
    isAccountActivated: {
      type: Boolean,
      default: false
    },
    notification: {
      isRead_survey_not_complete: {
        type: Boolean,
        default: false
      },
      isRead_uni_assist_task_assigned: {
        type: Boolean,
        default: false
      },
      isRead_new_agent_assigned: {
        type: Boolean,
        default: true
      },
      isRead_new_editor_assigned: {
        type: Boolean,
        default: true
      },
      isRead_new_cvmlrl_tasks_created: {
        type: Boolean,
        default: true
      },
      isRead_new_cvmlrl_messsage: {
        type: Boolean,
        default: true
      },
      isRead_base_documents_missing: {
        type: Boolean,
        default: false
      },
      isRead_base_documents_rejected: {
        type: Boolean,
        default: true
      },
      isRead_new_programs_assigned: {
        type: Boolean,
        default: false
      }
    },
    taigerai: {
      input: {
        name: {
          type: String,
          default: ''
        },
        status: {
          type: String,
          enum: Object.values(DocumentStatusType),
          default: DocumentStatusType.Missing
        },
        file_category: {
          type: String,
          default: 'Others'
        },
        path: {
          type: String,
          default: ''
        },
        // TODO: updateBy
        updatedAt: Date
      },
      output: {
        name: {
          type: String,
          default: ''
        },
        status: {
          type: String,
          enum: Object.values(DocumentStatusType),
          default: DocumentStatusType.Missing
        },
        file_category: {
          type: String,
          default: 'Others'
        },
        path: {
          type: String,
          default: ''
        },
        // TODO: updateBy
        updatedAt: Date
      },
      feedback: {
        message: {
          type: String,
          default: ''
        },
        // TODO: updateBy
        updatedAt: Date
      }
    },
    application_preference: {
      expected_application_date: {
        type: String,
        default: ''
      },

      expected_application_semester: {
        type: String,
        default: ''
      },
      target_program_language: {
        type: String,
        default: ''
      },
      // To be deprecated -> read only in frontend
      target_application_field: {
        type: String,
        default: ''
      },
      targetApplicationSubjects: [
        {
          type: String,
          enum: PROGRAM_SUBJECT_KEYS
        }
      ],
      target_degree: {
        type: String,
        default: ''
      },
      considered_privat_universities: {
        type: String,
        default: '-'
      },
      special_wished: {
        type: String,
        default: ''
      },
      application_outside_germany: {
        type: String,
        default: '-'
      },
      updatedAt: Date
    },
    academic_background: {
      university: {
        high_school_isGraduated: {
          type: String,
          default: ''
        },
        attended_high_school: {
          type: String,
          default: ''
        },
        high_school_graduated_year: {
          type: String,
          default: ''
        },
        attended_university: {
          type: String,
          default: ''
        },
        attended_university_program: {
          type: String,
          default: ''
        },
        isGraduated: {
          type: String,
          default: '-'
        },
        expected_grad_date: {
          type: String,
          default: ''
        },
        Highest_GPA_Uni: {
          type: Number
        },
        Passing_GPA_Uni: {
          type: Number
        },
        My_GPA_Uni: {
          type: Number
        },
        Has_Exchange_Experience: {
          type: String,
          default: '-'
        },
        isSecondGraduated: {
          type: String,
          default: '-'
        },
        expectedSecondDegreeGradDate: {
          type: String,
          default: ''
        },
        attendedSecondDegreeUniversity: {
          type: String,
          default: ''
        },
        attendedSecondDegreeProgram: {
          type: String,
          default: ''
        },
        highestSecondDegreeGPA: {
          type: Number
        },
        passingSecondDegreeGPA: {
          type: Number
        },
        mySecondDegreeGPA: {
          type: Number
        },
        Has_Internship_Experience: {
          type: String,
          default: '-'
        },
        Has_Working_Experience: {
          type: String,
          default: '-'
        },
        updatedAt: Date
      },
      language: {
        english_isPassed: {
          type: String,
          default: '-'
        },
        english_certificate: {
          type: String,
          default: ''
        },
        english_score: {
          type: String,
          default: ''
        },
        english_score_reading: {
          type: String,
          default: ''
        },
        english_score_listening: {
          type: String,
          default: ''
        },
        english_score_writing: {
          type: String,
          default: ''
        },
        english_score_speaking: {
          type: String,
          default: ''
        },
        english_test_date: {
          type: String,
          default: ''
        },
        german_isPassed: {
          type: String,
          default: '-'
        },
        german_certificate: {
          type: String,
          default: ''
        },
        german_score: {
          type: String,
          default: ''
        },
        german_test_date: {
          type: String,
          default: ''
        },
        gre_isPassed: {
          type: String,
          default: '-'
        },
        gre_certificate: {
          type: String,
          default: ''
        },
        gre_score: {
          type: String,
          default: ''
        },
        gre_test_date: {
          type: String,
          default: ''
        },
        gmat_isPassed: {
          type: String,
          default: '-'
        },
        gmat_certificate: {
          type: String,
          default: ''
        },
        gmat_score: {
          type: String,
          default: ''
        },
        gmat_test_date: {
          type: String,
          default: ''
        },
        updatedAt: Date
      }
    },
    lastLoginAt: Date
  },
  options
);

const studentSchema = new Schema(
  {
    agents: [{ type: Schema.Types.ObjectId, ref: 'Agent' }],
    editors: [{ type: Schema.Types.ObjectId, ref: 'Editor' }],
    needEditor: { type: Boolean, default: false },
    applying_program_count: {
      type: Number,
      default: 0
    },
    attributes: [
      {
        type: attributeSchema,
        required: true
      }
    ],
    profile: [
      {
        name: {
          type: String,
          required: true
        },
        status: {
          type: String,
          enum: Object.values(DocumentStatusType),
          default: DocumentStatusType.Missing
        },
        required: {
          type: Boolean,
          required: true
        },
        path: {
          type: String,
          default: ''
        },
        feedback: {
          type: String,
          default: ''
        },
        // TODO: updateBy
        updatedAt: Date
      }
    ],
    generaldocs_threads: [
      {
        isFinalVersion: {
          type: Boolean,
          default: false
        },
        latest_message_left_by_id: {
          type: String,
          default: ''
        },
        doc_thread_id: { type: Schema.Types.ObjectId, ref: 'Documentthread' },
        updatedAt: Date,
        createdAt: Date
      }
    ]
  },
  options
);

const externalSchema = new Schema(
  {
    attribute: {
      can_update_program_list: {
        type: Boolean,
        default: false
      },
      can_update_course_analysis: {
        type: Boolean,
        default: false
      },
      can_add_articles: {
        type: Boolean,
        default: false
      }
    }
  },
  options
);

const managerSchema = new Schema(
  {
    agents: [{ type: Schema.Types.ObjectId, ref: 'Agent' }],
    editors: [{ type: Schema.Types.ObjectId, ref: 'Editor' }],
    manager_type: {
      type: String,
      enum: Object.values(ManagerType),
      default: ManagerType.None
    },
    manager_notification: {
      isRead_new_base_docs_uploaded: [
        {
          student_id: {
            type: String,
            default: ''
          }
        }
      ],
      isRead_new_programs_assigned: {
        type: Boolean,
        default: false
      }
    },
    attribute: {
      can_write_ml: {
        type: Boolean,
        default: false
      },
      can_write_rl: {
        type: Boolean,
        default: false
      },
      can_write_cv: {
        type: Boolean,
        default: false
      },
      can_write_essay: {
        type: Boolean,
        default: false
      },
      can_do_interview: {
        type: Boolean,
        default: false
      }
    }
  },
  options
);

const officehoursSchema = new Schema({
  Monday: {
    active: { type: Boolean, default: false },
    time_slots: [{ type: Object }]
  },
  Tuesday: {
    active: { type: Boolean, default: false },
    time_slots: [{ type: Object }]
  },
  Wednesday: {
    active: { type: Boolean, default: false },
    time_slots: [{ type: Object }]
  },
  Thursday: {
    active: { type: Boolean, default: false },
    time_slots: [{ type: Object }]
  },
  Friday: {
    active: { type: Boolean, default: false },
    time_slots: [{ type: Object }]
  },
  Saturday: {
    active: { type: Boolean, default: false },
    time_slots: [{ type: Object }]
  },
  Sunday: {
    active: { type: Boolean, default: false },
    time_slots: [{ type: Object }]
  }
});

const agentSchema = new Schema(
  {
    timezone: { type: String, default: '' },
    officehours: { type: officehoursSchema, default: {} },
    selfIntroduction: {
      type: String,
      default: ''
    },
    agent_notification: {
      isRead_new_base_docs_uploaded: [
        {
          student_id: {
            type: String,
            default: ''
          },
          student_firstname: {
            type: String,
            default: ''
          },
          student_lastname: {
            type: String,
            default: ''
          }
        }
      ],
      isRead_new_survey_updated: {
        type: Boolean,
        default: true
      },
      isRead_applications_status_changed: {
        type: Boolean,
        default: true
      },
      isRead_new_programs_assigned: {
        type: Boolean,
        default: false
      }
    }
  },
  options
);

const editorSchema = new Schema(
  {
    officehours: { type: officehoursSchema, default: {} },
    editor_notification: {
      isRead_survey_not_complete: {
        type: Boolean,
        default: false
      },
      isRead_base_documents_missing: {
        type: Boolean,
        default: false
      },
      isRead_base_documents_rejected: {
        type: Boolean,
        default: false
      },
      isRead_new_programs_assigned: {
        type: Boolean,
        default: false
      }
    },
    attribute: {
      can_write_ml: {
        type: Boolean,
        default: false
      },
      can_write_rl: {
        type: Boolean,
        default: false
      },
      can_write_cv: {
        type: Boolean,
        default: false
      },
      can_write_essay: {
        type: Boolean,
        default: false
      },
      can_do_interview: {
        type: Boolean,
        default: false
      }
    }
  },
  options
);

module.exports = {
  attributeSchema,
  userSchema,
  studentSchema,
  agentSchema,
  externalSchema,
  editorSchema,
  managerSchema
};
