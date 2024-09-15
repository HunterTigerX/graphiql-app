import React, { useState } from 'react';
import { Stack, Typography, Box, TextField, Button } from '@mui/material';
import { ILanguage } from '@/interfaces/interfaces';

interface Variable {
  key: string;
  value: string;
}

interface VariablesManagerProps {
  variables: Variable[];
  setVariables: React.Dispatch<React.SetStateAction<Variable[]>>;
  languageData: ILanguage;
}

export default function VariablesManager({ variables, setVariables, languageData }: VariablesManagerProps) {
  const [isVariablesVisible, setVariablesVisible] = useState(false);
  const [variableKey, setVariableKey] = useState('');
  const [variableValue, setVariableValue] = useState('');

  const addVariable = () => {
    if (variableKey && variableValue) {
      setVariables((prevVariables) => [...prevVariables, { key: variableKey, value: variableValue }]);
      setVariableKey('');
      setVariableValue('');
    }
  };

  const deleteVariable = (key: string) => {
    setVariables((prevVariables) => prevVariables.filter((variable) => variable.key !== key));
  };

  return (
    <Stack direction="column" alignItems="flex-start" spacing={2}>
      <Typography variant="h6" component="h3" fontWeight={600}>
        {languageData.variablesHeader}:
      </Typography>
      <Button variant="outlined" size="small" onClick={() => setVariablesVisible(!isVariablesVisible)}>
        {isVariablesVisible ? languageData.hideVariables : languageData.showVariables}
      </Button>
      {isVariablesVisible && (
        <Box sx={{ display: 'flex', gap: '20px', justifyContent: 'space-between' }}>
          <TextField
            type="text"
            label={languageData.variableKey}
            variant="standard"
            value={variableKey}
            onChange={(e) => setVariableKey(e.target.value)}
          />
          <TextField
            type="text"
            label={languageData.variableValue}
            variant="standard"
            value={variableValue}
            onChange={(e) => setVariableValue(e.target.value)}
          />
          <Button variant="outlined" size="small" onClick={addVariable}>
            {languageData.addVariable}
          </Button>
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'space-between',
          gap: '15px',
        }}
      >
        {variables.map((variable, index) => (
          <Typography
            variant="h6"
            component="div"
            key={index}
            sx={{ display: 'flex', gap: '5px', alignItems: 'center', justifyContent: 'space-between' }}
          >
            {variable.key}: {variable.value}
            <Button variant="outlined" size="small" onClick={() => deleteVariable(variable.key)}>
              Delete
            </Button>
          </Typography>
        ))}
      </Box>
    </Stack>
  );
}
