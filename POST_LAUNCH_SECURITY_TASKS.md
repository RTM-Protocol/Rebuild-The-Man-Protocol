# 🔒 Post-Launch Security Tasks
**Created**: January 2025  
**Priority**: Medium (Address after launch)  
**Status**: ⏳ Pending

---

## ⚠️ Vulnerable Dependencies to Address

After going live, these dev dependencies should be updated to address security vulnerabilities:

### 1. `glob` (High Severity)
**Current Issue**: Command injection vulnerability via CLI  
**Affected Package**: `eslint-config-next`  
**Fix Required**: Update to `eslint-config-next@16.1.1` (breaking change)

**Impact**:
- Dev dependency only (doesn't affect production)
- Used for ESLint configuration
- Breaking change may require ESLint config updates

**Action Plan**:
1. Create test branch: `git checkout -b security-update-eslint`
2. Update: `npm install eslint-config-next@16.1.1`
3. Test: Run `npm run lint` to verify no breaking changes
4. Check: Review any ESLint rule changes
5. Merge if successful

---

### 2. `jspdf` (Critical Severity)
**Current Issue**: Local File Inclusion/Path Traversal vulnerability  
**Affected Package**: `html2pdf.js`  
**Fix Required**: Update to `html2pdf.js@0.13.0` (breaking change)

**Impact**:
- Used for PDF export functionality
- Client-side only (limited attack surface)
- Breaking change may require code updates in `components/ExportModal.tsx`

**Action Plan**:
1. Create test branch: `git checkout -b security-update-pdf-export`
2. Update: `npm install html2pdf.js@0.13.0`
3. Test: Export PDFs in all formats (PDF, PNG, JPEG)
4. Verify: Check that export functionality still works
5. Review: Check `components/ExportModal.tsx` for any API changes
6. Merge if successful

---

## 📋 Recommended Update Sequence

### Option 1: Update Separately (Safer)
1. **First**: Update `html2pdf.js` (test PDF exports)
2. **Second**: Update `eslint-config-next` (test linting)

### Option 2: Update Together (Faster)
1. Create single test branch
2. Update both packages
3. Test everything
4. Merge if all tests pass

---

## 🧪 Testing Checklist

After updating, verify:

- [ ] `npm run dev` - App starts without errors
- [ ] `npm run build` - Production build succeeds
- [ ] `npm run lint` - No ESLint errors (if updating eslint-config-next)
- [ ] PDF Export - Test export to PDF format
- [ ] Image Export - Test export to PNG/JPEG formats
- [ ] All other exports - CSV, TXT, JSON still work
- [ ] No console errors in browser
- [ ] All features still functional

---

## 📝 Notes

- **Current Status**: App is fully functional with these vulnerabilities
- **Risk Level**: Low (dev dependencies, limited attack surface)
- **Timeline**: Address within 1-2 months after launch
- **Priority**: Medium (not blocking launch)

---

## 🔗 References

- npm audit report: Run `npm audit` to see current status
- glob vulnerability: https://github.com/advisories/GHSA-5j98-mcp5-4vw2
- jspdf vulnerability: https://github.com/advisories/GHSA-f8cm-6447-x5h2

---

**Last Updated**: January 2025  
**Next Review**: After launch