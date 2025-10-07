#!/bin/bash
cd /home/kavia/workspace/code-generation/resume-match-and-improve-147471-147481/resume_job_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

