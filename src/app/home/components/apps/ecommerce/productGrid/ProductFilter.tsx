import React from 'react';

import Select from 'react-select';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import assetsMetadata from '@/mock/assetsMetadata.json';

const Filters = () => {
    return (
        <>
            <List>
                <Divider />
                <Box p={3}>
                    <Typography marginBottom={2} fontSize="1.2rem" fontWeight="700">
                        Context
                    </Typography>
                    <Box mb={2}>
                        {Object.entries(assetsMetadata.context.schema.properties).map(([key, value]) => {
                            return (
                                <Box mb={1} key={key}>
                                    <Typography fontSize="0.85rem" fontWeight="700">
                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                    </Typography>

                                    {assetsMetadata.context.uiSchema[key]['ui:widget'] === 'radios' && (
                                        <Select
                                            name={key}
                                            options={value.enum}
                                        />
                                    )}

                                    {assetsMetadata.context.uiSchema[key]['ui:widget'] === 'checkboxes' && (
                                        <div>
                                            {value.items.enum.map((option) => (
                                                <div key={option}>
                                                    <input type="checkbox" id={option} name={key} value={option} />
                                                    <label htmlFor={option}>{option}</label>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {assetsMetadata.context.uiSchema[key]['ui:widget'] === 'textarea' && (
                                        <TextField fullWidth multiline id={key} name={key} />
                                    )}

                                    {assetsMetadata.context.uiSchema[key]['ui:widget'] === 'color' && (
                                        <input type="color" id={key} name={key} />
                                    )}

                                    {assetsMetadata.context.uiSchema[key]['ui:widget'] === 'text' && (
                                        <TextField fullWidth type="text" id={key} name={key} />
                                    )}
                                </Box>
                            );
                        })}
                    </Box>

                    <Divider />

                    <Typography marginBottom={2} fontSize="1.2rem" fontWeight="700">
                        Taxonomy
                    </Typography>
                    <Box mb={2}>
                        {Object.entries(assetsMetadata.taxonomy.schema.properties).map(([key, value]) => {
                            return (
                                <Box mb={1} key={key}>
                                    <Typography fontSize="0.85rem" fontWeight="700">
                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                    </Typography>

                                    {assetsMetadata.taxonomy.uiSchema[key]['ui:widget'] === 'radios' && (
                                        <div>
                                            {value.enum.map((option) => (
                                                <div key={option}>
                                                    <TextField fullWidth type="radio" id={option} name={key} value={option} />
                                                    <label htmlFor={option}>{option}</label>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {assetsMetadata.taxonomy.uiSchema[key]['ui:widget'] === 'checkboxes' && (
                                        <div>
                                            {value.items.enum.map((option) => (
                                                <div key={option}>
                                                    <input type="checkbox" id={option} name={key} value={option} />
                                                    <label htmlFor={option}>{option}</label>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {assetsMetadata.taxonomy.uiSchema[key]['ui:widget'] === 'textarea' && (
                                        <TextField fullWidth multiline id={key} name={key} />
                                    )}

                                    {assetsMetadata.taxonomy.uiSchema[key]['ui:widget'] === 'text' && (
                                        <TextField fullWidth type="text" id={key} name={key} />
                                    )}
                                </Box>
                            )
                        })}
                    </Box>

                    <Divider />

                    <Typography marginBottom={2} fontSize="1.2rem" fontWeight="700">
                        Creators
                    </Typography>
                    <Box mb={2}>
                        {Object.entries(assetsMetadata.creators.schema.items.properties).map(([key, value]) => {
                            return (
                                <Box mb={1} key={key}>
                                    <Typography fontSize="0.85rem" fontWeight="700">
                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                    </Typography>

                                    {assetsMetadata.creators.uiSchema.items[key]['ui:widget'] === 'radios' && (
                                        <div>
                                            {value.enum.map((option) => (
                                                <div key={option}>
                                                    <TextField fullWidth type="radio" id={option} name={key} value={option} />
                                                    <label htmlFor={option}>{option}</label>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {assetsMetadata.creators.uiSchema.items[key]['ui:widget'] === 'checkboxes' && (
                                        <div>
                                            {value.items.enum.map((option) => (
                                                <div key={option}>
                                                    <input type="checkbox" id={option} name={key} value={option} />
                                                    <label htmlFor={option}>{option}</label>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {assetsMetadata.creators.uiSchema.items[key]['ui:widget'] === 'textarea' && (
                                        <TextField fullWidth multiline id={key} name={key} />
                                    )}

                                    {assetsMetadata.creators.uiSchema.items[key]['ui:widget'] === 'text' && (
                                        <TextField fullWidth type="text" id={key} name={key} />
                                    )}
                                </Box>
                            )
                        })}
                    </Box>

                    <Divider />

                    <Typography marginBottom={2} fontSize="1.2rem" fontWeight="700">
                        Provenance
                    </Typography>
                    <Box mb={2}>
                        {Object.entries(assetsMetadata.provenance.schema.properties).map(([key, value]) => {
                            return (
                                <Box mb={1} key={key}>
                                    <Typography fontSize="0.85rem" fontWeight="700">
                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                    </Typography>

                                    {assetsMetadata.provenance.uiSchema[key]['ui:widget'] === 'radios' && (
                                        <div>
                                            {value.enum.map((option) => (
                                                <div key={option}>
                                                    <TextField fullWidth type="radio" id={option} name={key} value={option} />
                                                    <label htmlFor={option}>{option}</label>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {assetsMetadata.provenance.uiSchema[key]['ui:widget'] === 'tuple' && (
                                        <div>
                                            {Object.keys(assetsMetadata.provenance.uiSchema[key].items).map((option) => (
                                                <div key={option}>
                                                    <label htmlFor={option}>{option}</label>
                                                    <TextField fullWidth type="text" id={option} name={option} />
                                                </div>
                                            ))}
                                            
                                        </div>
                                    )}

                                    {assetsMetadata.provenance.uiSchema[key]['ui:widget'] === 'textarea' && (
                                        <TextField fullWidth multiline id={key} name={key} />
                                    )}

                                    {assetsMetadata.provenance.uiSchema[key]['ui:widget'] === 'text' && (
                                        <TextField fullWidth type="text" id={key} name={key} />
                                    )}
                                </Box>
                            )
                        })}
                    </Box>

                    <Button variant="contained" onClick={() => {}} fullWidth>
                        Reset Filters
                    </Button>
                </Box>
            </List>
        </>
    );
};

export default Filters;
