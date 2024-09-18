import React from "react";

const SecurityTxt = () => (
	<pre>
		{`# security.txt
# https://securitytxt.org/

# LHC Security Contact
Contact: mailto:abuse@lhc.lu

# OpenPGP key for LHC Security Contact
Encryption: https://pgp.circl.lu/pks/lookup?op=get&search=0x7fb3f03a46cefd02

# LHC Data Protection Contact
Contact: mailto:privacy@lhc.lu

# OpenPGP key for LHC Data Protection Contact
Encryption: https://pgp.circl.lu/pks/lookup?op=get&search=0xd0f568a902d945622c1c663ab294788344645f61

# Validity of current file
Expires: 2024-12-31T23:59:59Z`}
	</pre>
);

export default SecurityTxt;
