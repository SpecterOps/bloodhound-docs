// Must use arrow function syntax in Mintlify snippets
export const IDPIntro = ({ auth_mode }) => {
  const mode = (auth_mode || '').toUpperCase();
  const isOIDC = mode === 'OIDC';
  const href = isOIDC
    ? '/manage-bloodhound/auth/oidc'
    : '/manage-bloodhound/auth/saml';
  const label = isOIDC ? 'OIDC' : 'SAML';

  return (
    <Tip>
      See <a href={href}>{label} in BloodHound</a> for order of operations, general {label} setup, and user configuration in BloodHound.
    </Tip>
  );
};

export default IDPIntro;
